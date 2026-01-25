/**
 * DR Digital Awards - Scoring Engine
 * Calculates participant scores based on activity, reviews, engagement, and votes
 */

import { supabase } from '../lib/supabase';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

interface ScoringWeights {
    activityWeight: number;
    reviewWeight: number;
    engagementWeight: number;
    voteWeight: number;
}

interface ScoreBreakdown {
    participantId: string;
    activityScore: number;
    reviewScore: number;
    engagementScore: number;
    voteScore: number;
    finalScore: number;
    rank?: number;
    // Raw metrics for transparency
    totalPoints: number;
    totalReviews: number;
    averageRating: number;
    totalEngagement: number;
    totalVotes: number;
}

interface ParticipantData {
    id: string;
    participantId: string;
    participantType: 'dentist' | 'clinic' | 'company' | 'content';
    categoryId: string;
}

// =====================================================
// ACTIVITY SCORE CALCULATION
// =====================================================

/**
 * Calculate activity score based on platform actions (0-100)
 * Fetches activity logs and scoring rules to compute total points
 */
export async function calculateActivityScore(
    participantId: string,
    categoryId: string
): Promise<{ score: number; totalPoints: number }> {
    try {
        // 1. Fetch scoring rules for this category
        const { data: rules, error: rulesError } = await (supabase
            .from('award_scoring_rules') as any)
            .select('*')
            .eq('category_id', categoryId)
            .eq('is_active', true);

        if (rulesError) throw rulesError;
        if (!rules || rules.length === 0) {
            return { score: 0, totalPoints: 0 };
        }

        // 2. Fetch participant's activity logs
        const { data: activities, error: activityError } = await (supabase
            .from('profile_activity_logs') as any)
            .select('*')
            .eq('profile_id', participantId);

        if (activityError) throw activityError;

        // 3. Calculate total points
        let totalPoints = 0;
        const activityCounts: Record<string, number> = {};

        // Count occurrences of each activity type
        activities?.forEach((activity: any) => {
            const type = activity.activity_type;
            activityCounts[type] = (activityCounts[type] || 0) + 1;
        });

        // Apply scoring rules
        rules.forEach((rule: any) => {
            const count = activityCounts[rule.activity_type] || 0;
            let earnedPoints = 0;

            if (count > 0) {
                // Apply threshold
                if (!rule.threshold || count >= rule.threshold) {
                    // Apply max occurrences limit
                    const effectiveCount = rule.max_occurrences
                        ? Math.min(count, rule.max_occurrences)
                        : count;

                    earnedPoints = effectiveCount * rule.points_value * (rule.multiplier || 1);
                }
            }

            totalPoints += earnedPoints;
        });

        // 4. Normalize to 0-100 scale
        // Find max possible points in category (sum of all rule values)
        const maxPossiblePoints = rules.reduce((sum: number, rule: any) => {
            const maxCount = rule.max_occurrences || 10; // Default max
            return sum + (maxCount * rule.points_value * (rule.multiplier || 1));
        }, 0);

        const normalizedScore = maxPossiblePoints > 0
            ? Math.min(100, (totalPoints / maxPossiblePoints) * 100)
            : 0;

        return {
            score: parseFloat(normalizedScore.toFixed(2)),
            totalPoints
        };
    } catch (error) {
        console.error('Error calculating activity score:', error);
        return { score: 0, totalPoints: 0 };
    }
}

// =====================================================
// REVIEW SCORE CALCULATION
// =====================================================

/**
 * Calculate review score from profile ratings (0-100)
 * Considers average rating, review count, and recent trends
 */
export async function calculateReviewScore(
    participantId: string,
    minReviewThreshold: number = 5
): Promise<{ score: number; totalReviews: number; averageRating: number }> {
    try {
        // Fetch profile ratings
        const { data: ratings, error } = await (supabase
            .from('profile_ratings') as any)
            .select('rating, created_at')
            .eq('profile_id', participantId);

        if (error) throw error;

        if (!ratings || ratings.length === 0) {
            return { score: 0, totalReviews: 0, averageRating: 0 };
        }

        // Calculate average rating
        const totalReviews = ratings.length;
        const sumRatings = ratings.reduce((sum: number, r: any) => sum + (r.rating || 0), 0);
        const averageRating = sumRatings / totalReviews;

        // Base score: 5 stars = 100 points
        let baseScore = (averageRating / 5) * 100;

        // Apply penalty if reviews < threshold
        if (totalReviews < minReviewThreshold) {
            const penalty = totalReviews / minReviewThreshold;
            baseScore *= penalty;
        }

        // Check recent trend (last 90 days)
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const recentRatings = ratings.filter((r: any) =>
            new Date(r.created_at) >= ninetyDaysAgo
        );

        if (recentRatings.length > 0) {
            const recentAvg = recentRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / recentRatings.length;

            // If recent average is significantly lower, apply slight penalty
            if (recentAvg < averageRating - 0.5) {
                baseScore *= 0.95; // 5% penalty
            }
            // If recent average is higher, apply slight bonus
            else if (recentAvg > averageRating + 0.5) {
                baseScore *= 1.05; // 5% bonus
            }
        }

        return {
            score: parseFloat(Math.min(100, baseScore).toFixed(2)),
            totalReviews,
            averageRating: parseFloat(averageRating.toFixed(2))
        };
    } catch (error) {
        console.error('Error calculating review score:', error);
        return { score: 0, totalReviews: 0, averageRating: 0 };
    }
}

// =====================================================
// ENGAGEMENT SCORE CALCULATION
// =====================================================

/**
 * Calculate engagement score from content metrics (0-100)
 * Based on views, likes, shares, comments
 */
export async function calculateEngagementScore(
    participantId: string,
    categoryId: string
): Promise<{ score: number; totalEngagement: number }> {
    try {
        // Fetch participant's content (articles, podcasts, etc.)
        const { data: articles, error: articlesError } = await (supabase
            .from('articles') as any)
            .select('views, likes, shares, id')
            .eq('user_id', participantId)
            .eq('is_approved', true);

        if (articlesError) throw articlesError;

        if (!articles || articles.length === 0) {
            return { score: 0, totalEngagement: 0 };
        }

        // Calculate weighted engagement
        let totalEngagement = 0;

        articles.forEach((article: any) => {
            const views = article.views || 0;
            const likes = article.likes || 0;
            const shares = article.shares || 0;

            // Weighted formula: views * 0.4 + likes * 0.3 + shares * 0.3
            const articleEngagement = (views * 0.4) + (likes * 0.3) + (shares * 0.3);
            totalEngagement += articleEngagement;
        });

        // Normalize against category leader
        // Find max engagement in this category
        const { data: participants } = await (supabase
            .from('award_participants') as any)
            .select('participant_id')
            .eq('category_id', categoryId);

        let maxEngagement = totalEngagement;

        if (participants) {
            for (const p of participants) {
                if (p.participant_id === participantId) continue;

                const { data: otherArticles } = await (supabase
                    .from('articles') as any)
                    .select('views, likes, shares')
                    .eq('user_id', p.participant_id)
                    .eq('is_approved', true);

                if (otherArticles) {
                    const otherEngagement = otherArticles.reduce((sum: number, a: any) => {
                        return sum + ((a.views || 0) * 0.4) + ((a.likes || 0) * 0.3) + ((a.shares || 0) * 0.3);
                    }, 0);
                    maxEngagement = Math.max(maxEngagement, otherEngagement);
                }
            }
        }

        const normalizedScore = maxEngagement > 0
            ? (totalEngagement / maxEngagement) * 100
            : 0;

        return {
            score: parseFloat(Math.min(100, normalizedScore).toFixed(2)),
            totalEngagement: Math.floor(totalEngagement)
        };
    } catch (error) {
        console.error('Error calculating engagement score:', error);
        return { score: 0, totalEngagement: 0 };
    }
}

// =====================================================
// VOTE SCORE CALCULATION
// =====================================================

/**
 * Calculate vote score from public voting (0-100)
 * Normalized against category leader
 */
export async function calculateVoteScore(
    participantRecordId: string,
    categoryId: string
): Promise<{ score: number; totalVotes: number }> {
    try {
        // Count votes for this participant (exclude flagged)
        const { data: votes, error: voteError } = await (supabase
            .from('award_votes') as any)
            .select('id')
            .eq('participant_id', participantRecordId)
            .eq('is_flagged', false);

        if (voteError) throw voteError;

        const totalVotes = votes?.length || 0;

        // Find max votes in category
        const { data: allParticipants } = await (supabase
            .from('award_participants') as any)
            .select('id')
            .eq('category_id', categoryId);

        let maxVotes = totalVotes;

        if (allParticipants) {
            for (const p of allParticipants) {
                const { data: pVotes } = await (supabase
                    .from('award_votes') as any)
                    .select('id')
                    .eq('participant_id', p.id)
                    .eq('is_flagged', false);

                const pVoteCount = pVotes?.length || 0;
                maxVotes = Math.max(maxVotes, pVoteCount);
            }
        }

        const normalizedScore = maxVotes > 0
            ? (totalVotes / maxVotes) * 100
            : 0;

        return {
            score: parseFloat(normalizedScore.toFixed(2)),
            totalVotes
        };
    } catch (error) {
        console.error('Error calculating vote score:', error);
        return { score: 0, totalVotes: 0 };
    }
}

// =====================================================
// FINAL SCORE CALCULATION
// =====================================================

/**
 * Calculate final weighted score for a participant
 */
export async function calculateFinalScore(
    participantRecordId: string
): Promise<ScoreBreakdown | null> {
    try {
        // 1. Fetch participant data
        const { data: participant, error: pError } = await (supabase
            .from('award_participants') as any)
            .select('*, category:award_categories(*)')
            .eq('id', participantRecordId)
            .single();

        if (pError || !participant) {
            console.error('Participant not found:', pError);
            return null;
        }

        const category = participant.category;
        const weights: ScoringWeights = {
            activityWeight: category.activity_weight,
            reviewWeight: category.review_weight,
            engagementWeight: category.engagement_weight,
            voteWeight: category.vote_weight
        };

        // 2. Calculate all component scores
        const activityResult = await calculateActivityScore(
            participant.participant_id,
            category.id
        );

        const reviewResult = await calculateReviewScore(
            participant.participant_id,
            category.min_rating
        );

        const engagementResult = await calculateEngagementScore(
            participant.participant_id,
            category.id
        );

        const voteResult = await calculateVoteScore(
            participantRecordId,
            category.id
        );

        // 3. Calculate weighted final score
        const finalScore = (
            (activityResult.score * weights.activityWeight / 100) +
            (reviewResult.score * weights.reviewWeight / 100) +
            (engagementResult.score * weights.engagementWeight / 100) +
            (voteResult.score * weights.voteWeight / 100)
        );

        // 4. Prepare score breakdown
        const breakdown: ScoreBreakdown = {
            participantId: participantRecordId,
            activityScore: activityResult.score,
            reviewScore: reviewResult.score,
            engagementScore: engagementResult.score,
            voteScore: voteResult.score,
            finalScore: parseFloat(finalScore.toFixed(2)),
            totalPoints: activityResult.totalPoints,
            totalReviews: reviewResult.totalReviews,
            averageRating: reviewResult.averageRating,
            totalEngagement: engagementResult.totalEngagement,
            totalVotes: voteResult.totalVotes
        };

        // 5. Save to database
        await saveScoreBreakdown(breakdown);

        // 6. Update participant's final score
        await (supabase
            .from('award_participants') as any)
            .update({ final_score: finalScore })
            .eq('id', participantRecordId);

        return breakdown;
    } catch (error) {
        console.error('Error calculating final score:', error);
        return null;
    }
}

// =====================================================
// DATABASE OPERATIONS
// =====================================================

/**
 * Save score breakdown to database
 */
async function saveScoreBreakdown(breakdown: ScoreBreakdown): Promise<void> {
    try {
        await (supabase
            .from('award_scores') as any)
            .upsert({
                participant_id: breakdown.participantId,
                activity_score: breakdown.activityScore,
                review_score: breakdown.reviewScore,
                engagement_score: breakdown.engagementScore,
                vote_score: breakdown.voteScore,
                final_score: breakdown.finalScore,
                total_points: breakdown.totalPoints,
                total_reviews: breakdown.totalReviews,
                average_rating: breakdown.averageRating,
                total_engagement: breakdown.totalEngagement,
                total_votes: breakdown.totalVotes,
                calculated_at: new Date().toISOString()
            }, {
                onConflict: 'participant_id'
            });
    } catch (error) {
        console.error('Error saving score breakdown:', error);
    }
}

/**
 * Recalculate scores for all participants in a category
 */
export async function recalculateCategory(categoryId: string): Promise<void> {
    try {
        console.log(`Recalculating scores for category: ${categoryId}`);

        // Fetch all participants in category
        const { data: participants, error } = await (supabase
            .from('award_participants') as any)
            .select('id')
            .eq('category_id', categoryId)
            .in('status', ['eligible', 'shortlisted', 'finalist']);

        if (error) throw error;

        if (!participants || participants.length === 0) {
            console.log('No participants found');
            return;
        }

        console.log(`Found ${participants.length} participants`);

        // Calculate scores for each participant
        for (const participant of participants) {
            await calculateFinalScore(participant.id);
        }

        // Update rankings
        await updateRankings(categoryId);

        console.log('Category recalculation complete');
    } catch (error) {
        console.error('Error recalculating category:', error);
    }
}

/**
 * Update participant rankings based on final scores
 */
async function updateRankings(categoryId: string): Promise<void> {
    try {
        // Fetch all participants sorted by score
        const { data: participants, error } = await (supabase
            .from('award_participants') as any)
            .select('id, final_score')
            .eq('category_id', categoryId)
            .order('final_score', { ascending: false });

        if (error) throw error;

        // Update ranks
        for (let i = 0; i < participants.length; i++) {
            await (supabase
                .from('award_participants') as any)
                .update({ rank: i + 1 })
                .eq('id', participants[i].id);
        }
    } catch (error) {
        console.error('Error updating rankings:', error);
    }
}

/**
 * Recalculate scores for entire award
 */
export async function recalculateAward(awardId: string): Promise<void> {
    try {
        console.log(`Recalculating all categories for award: ${awardId}`);

        // Fetch all categories
        const { data: categories, error } = await (supabase
            .from('award_categories') as any)
            .select('id')
            .eq('award_id', awardId)
            .eq('is_active', true);

        if (error) throw error;

        for (const category of categories) {
            await recalculateCategory(category.id);
        }

        console.log('Award recalculation complete');
    } catch (error) {
        console.error('Error recalculating award:', error);
    }
}

// =====================================================
// EXPORTS
// =====================================================

export const ScoringService = {
    calculateActivityScore,
    calculateReviewScore,
    calculateEngagementScore,
    calculateVoteScore,
    calculateFinalScore,
    recalculateCategory,
    recalculateAward
};
