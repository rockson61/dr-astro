import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

import { ScoringService } from '../../../services/awardsScoringService';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { awardId, categoryId, participantId } = body;

    // TODO: Add proper auth check using Supabase server client
    // const supabase = createSupabaseServerClient({ cookies });
    // const { data: { user } } = await supabase.auth.getUser();

    let result;

    if (participantId) {
      result = await ScoringService.calculateFinalScore(participantId);
      return new Response(JSON.stringify({
        success: true,
        message: 'Participant score recalculated',
        data: result
      }), { status: 200 });
    } else if (categoryId) {
      await ScoringService.recalculateCategory(categoryId);
      return new Response(JSON.stringify({
        success: true,
        message: 'Category scores recalculated'
      }), { status: 200 });
    } else if (awardId) {
      await ScoringService.recalculateAward(awardId);
      return new Response(JSON.stringify({
        success: true,
        message: 'Award scores recalculated'
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({
        error: 'Missing required parameter: awardId, categoryId, or participantId'
      }), { status: 400 });
    }

  } catch (error: any) {
    console.error('Recalculation error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to recalculate scores',
      details: error.message
    }), { status: 500 });
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const participantId = url.searchParams.get('participantId');

    if (!participantId) {
      return new Response(JSON.stringify({
        error: 'Missing participantId parameter'
      }), { status: 400 });
    }

    const result = await ScoringService.calculateFinalScore(participantId);

    if (!result) {
      return new Response(JSON.stringify({
        error: 'Participant not found or score calculation failed'
      }), { status: 404 });
    }

    return new Response(JSON.stringify({
      success: true,
      data: result
    }), { status: 200 });
  } catch (error: any) {
    console.error('Score fetch error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch score',
      details: error.message
    }), { status: 500 });
  }
}
