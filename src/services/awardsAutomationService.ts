/**
 * DR Digital Awards - Automation Service
 * Handles eligibility checking, shortlisting, and winner determination
 */

import { supabase } from '../lib/supabase';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

interface EligibilityResult {
    isEligible: boolean;
    reason?: string;
    profileId: string;
    categoryId: string;
}

interface ShortlistResult {
    categoryId: string;
    shortlistedCount: number;
    finalistsCount: number;
    participantIds: string[];
}

// =====================================================
// ELIGIBILITY CHECKING
// =====================================================

/**
 * Check if a profile is eligible for a specific award category
 */
export async function checkEligibility(
    profileId: string,
    categoryId: string
): Promise<EligibilityResult> {
    try {
        // Fetch category eligibility rules
        const { data: category, error: catError } = await (supabase
            .from('award_categories') as any)
            .select('*')
            .eq('id', categoryId)
            .single();

        if (catError || !category) {
            return {
                isEligible: false,
                reason: 'Category not found',
                profileId,
                categoryId
            };
        }

        // Fetch profile data
        const { data: profile, error: profileError } = await (supabase
            .from('profiles') as any)
            .select('*, analytics:profile_analytics(*)')
            .eq('id', profileId)
            .single();

        if (profileError || !profile) {
            return {
                isEligible: false,
                reason: 'Profile not found',
                profileId,
                categoryId
            };
        }

        // Check verification requirement
        if (category.requires_verification && !profile.is_verified) {
            return {
                isEligible: false,
                reason: 'Profile must be verified',
                profileId,
                categoryId
            };
        }

        // Check minimum articles
        const { data: articles } = await (supabase
            .from('articles') as any)
            .select('id')
            .eq('user_id', profileId)
            .eq('is_approved', true);

        const articleCount = articles?.length || 0;
        if (articleCount < category.min_articles) {
            return {
                isEligible: false,
                reason: `Minimum ${category.min_articles} articles required (has ${articleCount})`,
                profileId,
                categoryId
            };
        }

        // Check minimum rating
        const { data: ratings } = await (supabase
            .from('profile_ratings') as any)
            .select('rating')
            .eq('profile_id', profileId);

        if (ratings && ratings.length > 0) {
            const avgRating = ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length;
            if (avgRating < category.min_rating) {
                return {
                    isEligible: false,
                    reason: `Minimum ${category.min_rating} star rating required (has ${avgRating.toFixed(1)})`,
                    profileId,
                    categoryId
                };
            }
        } else if (category.min_rating > 0) {
            return {
                isEligible: false,
                reason: 'No ratings yet',
                profileId,
                categoryId
            };
        }

        // Check minimum followers (if analytics available)
        const followerCount = profile.analytics?.followers_count || 0;
        if (followerCount < category.min_followers) {
            return {
                isEligible: false,
                reason: `Minimum ${category.min_followers} followers required (has ${followerCount})`,
                profileId,
                categoryId
            };
        }

        // All checks passed
        return {
            isEligible: true,
            profileId,
            categoryId
        };
    } catch (error) {
        console.error('Error checking eligibility:', error);
        return {
            isEligible: false,
            reason: 'Error checking eligibility',
            profileId,
            categoryId
        };
    }
}

/**
 * Check eligibility for all profiles and auto-nominate
 */
export async function autoNominateEligibleProfiles(categoryId: string): Promise<number> {
    try {
        console.log(`Auto-nominating eligible profiles for category: ${categoryId}`);

        // Fetch all active profiles
        const { data: profiles, error } = await (supabase
            .from('profiles') as any)
            .select('id')
            .eq('is_active', true);

        if (error) throw error;

        let nominatedCount = 0;

        for (const profile of profiles) {
            const eligibility = await checkEligibility(profile.id, categoryId);

            if (eligibility.isEligible) {
                // Check if already nominated
                const { data: existing } = await (supabase
                    .from('award_participants') as any)
                    .select('id')
                    .eq('category_id', categoryId)
                    .eq('participant_id', profile.id)
                    .single();

                if (!existing) {
                    // Auto-nominate
                    const { error: insertError } = await (supabase
                        .from('award_participants') as any)
                        .insert({
                            category_id: categoryId,
                            participant_id: profile.id,
                            participant_type: 'dentist',
                            status: 'eligible',
                            auto_nominated: true
                        });

                    if (!insertError) {
                        nominatedCount++;
                    }
                }
            }
        }

        console.log(`Auto-nominated ${nominatedCount} profiles`);
        return nominatedCount;
    } catch (error) {
        console.error('Error auto-nominating:', error);
        return 0;
    }
}

// =====================================================
// SHORTLISTING & FINALIST SELECTION
// =====================================================

/**
 * Automatically select shortlist and finalists based on scores
 */
export async function updateShortlists(categoryId: string): Promise<ShortlistResult> {
    try {
        console.log(`Updating shortlists for category: ${categoryId}`);

        // Fetch category config
        const { data: category } = await (supabase
            .from('award_categories') as any)
            .select('max_finalists')
            .eq('id', categoryId)
            .single();

        const maxFinalists = category?.max_finalists || 20;

        // Fetch all eligible participants sorted by score
        const { data: participants, error } = await (supabase
            .from('award_participants') as any)
            .select('id, rank, final_score')
            .eq('category_id', categoryId)
            .eq('status', 'eligible')
            .order('final_score', { ascending: false })
            .limit(maxFinalists);

        if (error) throw error;

        if (!participants || participants.length === 0) {
            return {
                categoryId,
                shortlistedCount: 0,
                finalistsCount: 0,
                participantIds: []
            };
        }

        // Update top performers to shortlisted/finalist
        const shortlistCutoff = Math.min(maxFinalists, participants.length);
        const finalistCutoff = Math.min(10, participants.length); // Top 10 are finalists

        const participantIds: string[] = [];

        for (let i = 0; i < participants.length; i++) {
            const participant = participants[i];
            let newStatus = 'eligible';

            if (i < finalistCutoff) {
                newStatus = 'finalist';
            } else if (i < shortlistCutoff) {
                newStatus = 'shortlisted';
            }

            // Update status
            await (supabase
                .from('award_participants') as any)
                .update({
                    status: newStatus,
                    status_updated_at: new Date().toISOString()
                })
                .eq('id', participant.id);

            participantIds.push(participant.id);
        }

        console.log(`Shortlist updated: ${finalistCutoff} finalists, ${shortlistCutoff - finalistCutoff} shortlisted`);

        return {
            categoryId,
            shortlistedCount: shortlistCutoff - finalistCutoff,
            finalistsCount: finalistCutoff,
            participantIds
        };
    } catch (error) {
        console.error('Error updating shortlists:', error);
        return {
            categoryId,
            shortlistedCount: 0,
            finalistsCount: 0,
            participantIds: []
        };
    }
}

// =====================================================
// WINNER DETERMINATION
// =====================================================

/**
 * Determine winners based on final scores
 */
export async function determineWinners(categoryId: string): Promise<void> {
    try {
        console.log(`Determining winners for category: ${categoryId}`);

        // Fetch category config
        const { data: category } = await (supabase
            .from('award_categories') as any)
            .select('max_winners')
            .eq('id', categoryId)
            .single();

        const maxWinners = category?.max_winners || 1;

        // Fetch top scoring finalists
        const { data: topParticipants, error } = await (supabase
            .from('award_participants') as any)
            .select('id, participant_id, final_score')
            .eq('category_id', categoryId)
            .eq('status', 'finalist')
            .order('final_score', { ascending: false })
            .limit(maxWinners + 2); // Get a few extras for runners-up

        if (error) throw error;

        if (!topParticipants || topParticipants.length === 0) {
            console.log('No finalists found');
            return;
        }

        // Mark winners and runners-up
        for (let i = 0; i < topParticipants.length; i++) {
            const participant = topParticipants[i];
            let newStatus = 'finalist';

            if (i < maxWinners) {
                newStatus = 'winner';
                console.log(`Winner #${i + 1}: ${participant.participant_id} (score: ${participant.final_score})`);
            } else if (i < maxWinners + 2) {
                newStatus = 'runner_up';
            }

            await (supabase
                .from('award_participants') as any)
                .update({
                    status: newStatus,
                    status_updated_at: new Date().toISOString()
                })
                .eq('id', participant.id);

            // Assign badge to winner/runner-up
            if (newStatus === 'winner' || newStatus === 'runner_up') {
                await assignBadge(participant.participant_id, categoryId, newStatus);
            }
        }

        console.log('Winners determined successfully');
    } catch (error) {
        console.error('Error determining winners:', error);
    }
}

// =====================================================
// BADGE ASSIGNMENT
// =====================================================

/**
 * Assign award badge to winner's profile
 */
async function assignBadge(
    profileId: string,
    categoryId: string,
    status: 'winner' | 'runner_up'
): Promise<void> {
    try {
        // Fetch category and award info
        const { data: category } = await (supabase
            .from('award_categories') as any)
            .select('name, award:awards(year, title)')
            .eq('id', categoryId)
            .single();

        if (!category) return;

        const badgeName = status === 'winner'
            ? `🏆 ${category.name} ${category.award.year}`
            : `🥈 ${category.name} Runner-up ${category.award.year}`;

        // Fetch current profile badges
        const { data: profile } = await (supabase
            .from('profiles') as any)
            .select('awards_won')
            .eq('id', profileId)
            .single();

        const currentBadges = profile?.awards_won || [];

        // Add new badge if not already present
        if (!currentBadges.includes(badgeName)) {
            const updatedBadges = [...currentBadges, badgeName];

            await (supabase
                .from('profiles') as any)
                .update({
                    awards_won: updatedBadges
                })
                .eq('id', profileId);

            console.log(`Badge assigned: ${badgeName} to ${profileId}`);
        }

        // TODO: Send notification to winner
    } catch (error) {
        console.error('Error assigning badge:', error);
    }
}

// =====================================================
// BATCH OPERATIONS
// =====================================================

/**
 * Run full automation workflow for a category
 */
export async function automateCategory(categoryId: string): Promise<void> {
    console.log(`\n=== Automating category: ${categoryId} ===`);

    // Step 1: Auto-nominate eligible profiles
    const nominated = await autoNominateEligibleProfiles(categoryId);
    console.log(`✅ Auto-nominated ${nominated} profiles`);

    // Step 2: Recalculate scores (from scoring service)
    // This should be called from the scoring service
    console.log('ℹ️  Run score recalculation separately via scoring service');

    // Step 3: Update shortlists
    const shortlistResult = await updateShortlists(categoryId);
    console.log(`✅ Shortlist: ${shortlistResult.finalistsCount} finalists, ${shortlistResult.shortlistedCount} shortlisted`);

    console.log('=== Automation complete ===\n');
}

/**
 * Finalize awards (after voting ends)
 */
export async function finalizeAward(awardId: string): Promise<void> {
    console.log(`\n=== Finalizing award: ${awardId} ===`);

    // Fetch all categories for this award
    const { data: categories } = await (supabase
        .from('award_categories') as any)
        .select('id, name')
        .eq('award_id', awardId)
        .eq('is_active', true);

    if (!categories) {
        console.log('No categories found');
        return;
    }

    // Determine winners for each category
    for (const category of categories) {
        console.log(`\n📊 Processing: ${category.name}`);
        await determineWinners(category.id);
    }

    // Update award status to concluded
    await (supabase
        .from('awards') as any)
        .update({ status: 'concluded' })
        .eq('id', awardId);

    console.log('\n=== Award finalized ===\n');
}

// =====================================================
// EXPORTS
// =====================================================

export const AutomationService = {
    checkEligibility,
    autoNominateEligibleProfiles,
    updateShortlists,
    determineWinners,
    automateCategory,
    finalizeAward
};
