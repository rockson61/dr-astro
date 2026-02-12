import { s as supabase } from './supabase_woKm2pOd.mjs';

async function calculateActivityScore(participantId, categoryId) {
  try {
    const { data: rules, error: rulesError } = await supabase.from("award_scoring_rules").select("*").eq("category_id", categoryId).eq("is_active", true);
    if (rulesError) throw rulesError;
    if (!rules || rules.length === 0) {
      return { score: 0, totalPoints: 0 };
    }
    const { data: activities, error: activityError } = await supabase.from("profile_activity_logs").select("*").eq("profile_id", participantId);
    if (activityError) throw activityError;
    let totalPoints = 0;
    const activityCounts = {};
    activities?.forEach((activity) => {
      const type = activity.activity_type;
      activityCounts[type] = (activityCounts[type] || 0) + 1;
    });
    rules.forEach((rule) => {
      const count = activityCounts[rule.activity_type] || 0;
      let earnedPoints = 0;
      if (count > 0) {
        if (!rule.threshold || count >= rule.threshold) {
          const effectiveCount = rule.max_occurrences ? Math.min(count, rule.max_occurrences) : count;
          earnedPoints = effectiveCount * rule.points_value * (rule.multiplier || 1);
        }
      }
      totalPoints += earnedPoints;
    });
    const maxPossiblePoints = rules.reduce((sum, rule) => {
      const maxCount = rule.max_occurrences || 10;
      return sum + maxCount * rule.points_value * (rule.multiplier || 1);
    }, 0);
    const normalizedScore = maxPossiblePoints > 0 ? Math.min(100, totalPoints / maxPossiblePoints * 100) : 0;
    return {
      score: parseFloat(normalizedScore.toFixed(2)),
      totalPoints
    };
  } catch (error) {
    console.error("Error calculating activity score:", error);
    return { score: 0, totalPoints: 0 };
  }
}
async function calculateReviewScore(participantId, minReviewThreshold = 5) {
  try {
    const { data: ratings, error } = await supabase.from("profile_ratings").select("rating, created_at").eq("profile_id", participantId);
    if (error) throw error;
    if (!ratings || ratings.length === 0) {
      return { score: 0, totalReviews: 0, averageRating: 0 };
    }
    const totalReviews = ratings.length;
    const sumRatings = ratings.reduce((sum, r) => sum + (r.rating || 0), 0);
    const averageRating = sumRatings / totalReviews;
    let baseScore = averageRating / 5 * 100;
    if (totalReviews < minReviewThreshold) {
      const penalty = totalReviews / minReviewThreshold;
      baseScore *= penalty;
    }
    const ninetyDaysAgo = /* @__PURE__ */ new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const recentRatings = ratings.filter(
      (r) => new Date(r.created_at) >= ninetyDaysAgo
    );
    if (recentRatings.length > 0) {
      const recentAvg = recentRatings.reduce((sum, r) => sum + r.rating, 0) / recentRatings.length;
      if (recentAvg < averageRating - 0.5) {
        baseScore *= 0.95;
      } else if (recentAvg > averageRating + 0.5) {
        baseScore *= 1.05;
      }
    }
    return {
      score: parseFloat(Math.min(100, baseScore).toFixed(2)),
      totalReviews,
      averageRating: parseFloat(averageRating.toFixed(2))
    };
  } catch (error) {
    console.error("Error calculating review score:", error);
    return { score: 0, totalReviews: 0, averageRating: 0 };
  }
}
async function calculateEngagementScore(participantId, categoryId) {
  try {
    const { data: articles, error: articlesError } = await supabase.from("articles").select("views, likes, shares, id").eq("user_id", participantId).eq("is_approved", true);
    if (articlesError) throw articlesError;
    if (!articles || articles.length === 0) {
      return { score: 0, totalEngagement: 0 };
    }
    let totalEngagement = 0;
    articles.forEach((article) => {
      const views = article.views || 0;
      const likes = article.likes || 0;
      const shares = article.shares || 0;
      const articleEngagement = views * 0.4 + likes * 0.3 + shares * 0.3;
      totalEngagement += articleEngagement;
    });
    const { data: participants } = await supabase.from("award_participants").select("participant_id").eq("category_id", categoryId);
    let maxEngagement = totalEngagement;
    if (participants) {
      for (const p of participants) {
        if (p.participant_id === participantId) continue;
        const { data: otherArticles } = await supabase.from("articles").select("views, likes, shares").eq("user_id", p.participant_id).eq("is_approved", true);
        if (otherArticles) {
          const otherEngagement = otherArticles.reduce((sum, a) => {
            return sum + (a.views || 0) * 0.4 + (a.likes || 0) * 0.3 + (a.shares || 0) * 0.3;
          }, 0);
          maxEngagement = Math.max(maxEngagement, otherEngagement);
        }
      }
    }
    const normalizedScore = maxEngagement > 0 ? totalEngagement / maxEngagement * 100 : 0;
    return {
      score: parseFloat(Math.min(100, normalizedScore).toFixed(2)),
      totalEngagement: Math.floor(totalEngagement)
    };
  } catch (error) {
    console.error("Error calculating engagement score:", error);
    return { score: 0, totalEngagement: 0 };
  }
}
async function calculateVoteScore(participantRecordId, categoryId) {
  try {
    const { data: votes, error: voteError } = await supabase.from("award_votes").select("id").eq("participant_id", participantRecordId).eq("is_flagged", false);
    if (voteError) throw voteError;
    const totalVotes = votes?.length || 0;
    const { data: allParticipants } = await supabase.from("award_participants").select("id").eq("category_id", categoryId);
    let maxVotes = totalVotes;
    if (allParticipants) {
      for (const p of allParticipants) {
        const { data: pVotes } = await supabase.from("award_votes").select("id").eq("participant_id", p.id).eq("is_flagged", false);
        const pVoteCount = pVotes?.length || 0;
        maxVotes = Math.max(maxVotes, pVoteCount);
      }
    }
    const normalizedScore = maxVotes > 0 ? totalVotes / maxVotes * 100 : 0;
    return {
      score: parseFloat(normalizedScore.toFixed(2)),
      totalVotes
    };
  } catch (error) {
    console.error("Error calculating vote score:", error);
    return { score: 0, totalVotes: 0 };
  }
}
async function calculateFinalScore(participantRecordId) {
  try {
    const { data: participant, error: pError } = await supabase.from("award_participants").select("*, category:award_categories(*)").eq("id", participantRecordId).single();
    if (pError || !participant) {
      console.error("Participant not found:", pError);
      return null;
    }
    const category = participant.category;
    const weights = {
      activityWeight: category.activity_weight,
      reviewWeight: category.review_weight,
      engagementWeight: category.engagement_weight,
      voteWeight: category.vote_weight
    };
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
    const finalScore = activityResult.score * weights.activityWeight / 100 + reviewResult.score * weights.reviewWeight / 100 + engagementResult.score * weights.engagementWeight / 100 + voteResult.score * weights.voteWeight / 100;
    const breakdown = {
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
    await saveScoreBreakdown(breakdown);
    await supabase.from("award_participants").update({ final_score: finalScore }).eq("id", participantRecordId);
    return breakdown;
  } catch (error) {
    console.error("Error calculating final score:", error);
    return null;
  }
}
async function saveScoreBreakdown(breakdown) {
  try {
    await supabase.from("award_scores").upsert({
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
      calculated_at: (/* @__PURE__ */ new Date()).toISOString()
    }, {
      onConflict: "participant_id"
    });
  } catch (error) {
    console.error("Error saving score breakdown:", error);
  }
}
async function recalculateCategory(categoryId) {
  try {
    console.log(`Recalculating scores for category: ${categoryId}`);
    const { data: participants, error } = await supabase.from("award_participants").select("id").eq("category_id", categoryId).in("status", ["eligible", "shortlisted", "finalist"]);
    if (error) throw error;
    if (!participants || participants.length === 0) {
      console.log("No participants found");
      return;
    }
    console.log(`Found ${participants.length} participants`);
    for (const participant of participants) {
      await calculateFinalScore(participant.id);
    }
    await updateRankings(categoryId);
    console.log("Category recalculation complete");
  } catch (error) {
    console.error("Error recalculating category:", error);
  }
}
async function updateRankings(categoryId) {
  try {
    const { data: participants, error } = await supabase.from("award_participants").select("id, final_score").eq("category_id", categoryId).order("final_score", { ascending: false });
    if (error) throw error;
    for (let i = 0; i < participants.length; i++) {
      await supabase.from("award_participants").update({ rank: i + 1 }).eq("id", participants[i].id);
    }
  } catch (error) {
    console.error("Error updating rankings:", error);
  }
}
async function recalculateAward(awardId) {
  try {
    console.log(`Recalculating all categories for award: ${awardId}`);
    const { data: categories, error } = await supabase.from("award_categories").select("id").eq("award_id", awardId).eq("is_active", true);
    if (error) throw error;
    for (const category of categories) {
      await recalculateCategory(category.id);
    }
    console.log("Award recalculation complete");
  } catch (error) {
    console.error("Error recalculating award:", error);
  }
}
const ScoringService = {
  calculateActivityScore,
  calculateReviewScore,
  calculateEngagementScore,
  calculateVoteScore,
  calculateFinalScore,
  recalculateCategory,
  recalculateAward
};

export { ScoringService as S };
