import '../../../chunks/supabase_CFYPoMlB.mjs';
import { S as ScoringService } from '../../../chunks/awardsScoringService_DgXzsxM4.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { awardId, categoryId, participantId } = body;
    let result;
    if (participantId) {
      result = await ScoringService.calculateFinalScore(participantId);
      return new Response(JSON.stringify({
        success: true,
        message: "Participant score recalculated",
        data: result
      }), { status: 200 });
    } else if (categoryId) {
      await ScoringService.recalculateCategory(categoryId);
      return new Response(JSON.stringify({
        success: true,
        message: "Category scores recalculated"
      }), { status: 200 });
    } else if (awardId) {
      await ScoringService.recalculateAward(awardId);
      return new Response(JSON.stringify({
        success: true,
        message: "Award scores recalculated"
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({
        error: "Missing required parameter: awardId, categoryId, or participantId"
      }), { status: 400 });
    }
  } catch (error) {
    console.error("Recalculation error:", error);
    return new Response(JSON.stringify({
      error: "Failed to recalculate scores",
      details: error.message
    }), { status: 500 });
  }
};
const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const participantId = url.searchParams.get("participantId");
    if (!participantId) {
      return new Response(JSON.stringify({
        error: "Missing participantId parameter"
      }), { status: 400 });
    }
    const result = await ScoringService.calculateFinalScore(participantId);
    if (!result) {
      return new Response(JSON.stringify({
        error: "Participant not found or score calculation failed"
      }), { status: 404 });
    }
    return new Response(JSON.stringify({
      success: true,
      data: result
    }), { status: 200 });
  } catch (error) {
    console.error("Score fetch error:", error);
    return new Response(JSON.stringify({
      error: "Failed to fetch score",
      details: error.message
    }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
