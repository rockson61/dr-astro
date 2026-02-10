import { createSupabaseServerClient } from '../../../lib/supabase';
import { AutomationService } from '../../../services/awardsAutomationService';
import { ScoringService } from '../../../services/awardsScoringService';


export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const body = await request.json();
        const { action, awardId, categoryId } = body;

        // Admin authentication check
        const supabase = createSupabaseServerClient({ cookies });
        const { data: { user } } = await supabase.auth.getUser();

        // Fetch user profile to check role
        if (!user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

        if (!profile || profile.role !== 'admin') {
            return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), { status: 403 });
        }

        switch (action) {
            case 'auto_nominate':
                if (!categoryId) {
                    return new Response(JSON.stringify({ error: 'Missing categoryId' }), { status: 400 });
                }
                const nominated = await AutomationService.autoNominateEligibleProfiles(categoryId);
                return new Response(JSON.stringify({
                    success: true,
                    message: `Auto-nominated ${nominated} profiles`,
                    count: nominated
                }), { status: 200 });

            case 'update_shortlist':
                if (!categoryId) {
                    return new Response(JSON.stringify({ error: 'Missing categoryId' }), { status: 400 });
                }
                const shortlistResult = await AutomationService.updateShortlists(categoryId);
                return new Response(JSON.stringify({
                    success: true,
                    message: 'Shortlist updated',
                    data: shortlistResult
                }), { status: 200 });

            case 'determine_winners':
                if (!categoryId) {
                    return new Response(JSON.stringify({ error: 'Missing categoryId' }), { status: 400 });
                }
                await AutomationService.determineWinners(categoryId);
                return new Response(JSON.stringify({
                    success: true,
                    message: 'Winners determined'
                }), { status: 200 });

            case 'automate_category':
                if (!categoryId) {
                    return new Response(JSON.stringify({ error: 'Missing categoryId' }), { status: 400 });
                }
                // Run full workflow
                await AutomationService.automateCategory(categoryId);
                // Also recalculate scores
                await ScoringService.recalculateCategory(categoryId);
                return new Response(JSON.stringify({
                    success: true,
                    message: 'Category automation complete'
                }), { status: 200 });

            case 'finalize_award':
                if (!awardId) {
                    return new Response(JSON.stringify({ error: 'Missing awardId' }), { status: 400 });
                }
                await AutomationService.finalizeAward(awardId);
                return new Response(JSON.stringify({
                    success: true,
                    message: 'Award finalized'
                }), { status: 200 });

            default:
                return new Response(JSON.stringify({
                    error: 'Invalid action. Use: auto_nominate, update_shortlist, determine_winners, automate_category, finalize_award'
                }), { status: 400 });
        }
    } catch (error: any) {
        console.error('Automation error:', error);
        return new Response(JSON.stringify({
            error: 'Automation failed',
            details: error.message
        }), { status: 500 });
    }
};
