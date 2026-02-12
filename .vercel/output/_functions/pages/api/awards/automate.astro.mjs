import { s as supabase, c as createSupabaseServerClient } from '../../../chunks/supabase_woKm2pOd.mjs';
import { S as ScoringService } from '../../../chunks/awardsScoringService_Ban8dlw0.mjs';
export { renderers } from '../../../renderers.mjs';

async function checkEligibility(profileId, categoryId) {
  try {
    const { data: category, error: catError } = await supabase.from("award_categories").select("*").eq("id", categoryId).single();
    if (catError || !category) {
      return {
        isEligible: false,
        reason: "Category not found",
        profileId,
        categoryId
      };
    }
    const { data: profile, error: profileError } = await supabase.from("profiles").select("*, analytics:profile_analytics(*)").eq("id", profileId).single();
    if (profileError || !profile) {
      return {
        isEligible: false,
        reason: "Profile not found",
        profileId,
        categoryId
      };
    }
    if (category.requires_verification && !profile.is_verified) {
      return {
        isEligible: false,
        reason: "Profile must be verified",
        profileId,
        categoryId
      };
    }
    const { data: articles } = await supabase.from("articles").select("id").eq("user_id", profileId).eq("is_approved", true);
    const articleCount = articles?.length || 0;
    if (articleCount < category.min_articles) {
      return {
        isEligible: false,
        reason: `Minimum ${category.min_articles} articles required (has ${articleCount})`,
        profileId,
        categoryId
      };
    }
    const { data: ratings } = await supabase.from("profile_ratings").select("rating").eq("profile_id", profileId);
    if (ratings && ratings.length > 0) {
      const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
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
        reason: "No ratings yet",
        profileId,
        categoryId
      };
    }
    const followerCount = profile.analytics?.followers_count || 0;
    if (followerCount < category.min_followers) {
      return {
        isEligible: false,
        reason: `Minimum ${category.min_followers} followers required (has ${followerCount})`,
        profileId,
        categoryId
      };
    }
    return {
      isEligible: true,
      profileId,
      categoryId
    };
  } catch (error) {
    console.error("Error checking eligibility:", error);
    return {
      isEligible: false,
      reason: "Error checking eligibility",
      profileId,
      categoryId
    };
  }
}
async function autoNominateEligibleProfiles(categoryId) {
  try {
    console.log(`Auto-nominating eligible profiles for category: ${categoryId}`);
    const { data: profiles, error } = await supabase.from("profiles").select("id").eq("is_active", true);
    if (error) throw error;
    let nominatedCount = 0;
    for (const profile of profiles) {
      const eligibility = await checkEligibility(profile.id, categoryId);
      if (eligibility.isEligible) {
        const { data: existing } = await supabase.from("award_participants").select("id").eq("category_id", categoryId).eq("participant_id", profile.id).single();
        if (!existing) {
          const { error: insertError } = await supabase.from("award_participants").insert({
            category_id: categoryId,
            participant_id: profile.id,
            participant_type: "dentist",
            status: "eligible",
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
    console.error("Error auto-nominating:", error);
    return 0;
  }
}
async function updateShortlists(categoryId) {
  try {
    console.log(`Updating shortlists for category: ${categoryId}`);
    const { data: category } = await supabase.from("award_categories").select("max_finalists").eq("id", categoryId).single();
    const maxFinalists = category?.max_finalists || 20;
    const { data: participants, error } = await supabase.from("award_participants").select("id, rank, final_score").eq("category_id", categoryId).eq("status", "eligible").order("final_score", { ascending: false }).limit(maxFinalists);
    if (error) throw error;
    if (!participants || participants.length === 0) {
      return {
        categoryId,
        shortlistedCount: 0,
        finalistsCount: 0,
        participantIds: []
      };
    }
    const shortlistCutoff = Math.min(maxFinalists, participants.length);
    const finalistCutoff = Math.min(10, participants.length);
    const participantIds = [];
    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      let newStatus = "eligible";
      if (i < finalistCutoff) {
        newStatus = "finalist";
      } else if (i < shortlistCutoff) {
        newStatus = "shortlisted";
      }
      await supabase.from("award_participants").update({
        status: newStatus,
        status_updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", participant.id);
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
    console.error("Error updating shortlists:", error);
    return {
      categoryId,
      shortlistedCount: 0,
      finalistsCount: 0,
      participantIds: []
    };
  }
}
async function determineWinners(categoryId) {
  try {
    console.log(`Determining winners for category: ${categoryId}`);
    const { data: category } = await supabase.from("award_categories").select("max_winners").eq("id", categoryId).single();
    const maxWinners = category?.max_winners || 1;
    const { data: topParticipants, error } = await supabase.from("award_participants").select("id, participant_id, final_score").eq("category_id", categoryId).eq("status", "finalist").order("final_score", { ascending: false }).limit(maxWinners + 2);
    if (error) throw error;
    if (!topParticipants || topParticipants.length === 0) {
      console.log("No finalists found");
      return;
    }
    for (let i = 0; i < topParticipants.length; i++) {
      const participant = topParticipants[i];
      let newStatus = "finalist";
      if (i < maxWinners) {
        newStatus = "winner";
        console.log(`Winner #${i + 1}: ${participant.participant_id} (score: ${participant.final_score})`);
      } else if (i < maxWinners + 2) {
        newStatus = "runner_up";
      }
      await supabase.from("award_participants").update({
        status: newStatus,
        status_updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", participant.id);
      if (newStatus === "winner" || newStatus === "runner_up") {
        await assignBadge(participant.participant_id, categoryId, newStatus);
      }
    }
    console.log("Winners determined successfully");
  } catch (error) {
    console.error("Error determining winners:", error);
  }
}
async function assignBadge(profileId, categoryId, status) {
  try {
    const { data: category } = await supabase.from("award_categories").select("name, award:awards(year, title)").eq("id", categoryId).single();
    if (!category) return;
    const badgeName = status === "winner" ? `🏆 ${category.name} ${category.award.year}` : `🥈 ${category.name} Runner-up ${category.award.year}`;
    const { data: profile } = await supabase.from("profiles").select("awards_won").eq("id", profileId).single();
    const currentBadges = profile?.awards_won || [];
    if (!currentBadges.includes(badgeName)) {
      const updatedBadges = [...currentBadges, badgeName];
      await supabase.from("profiles").update({
        awards_won: updatedBadges
      }).eq("id", profileId);
      console.log(`Badge assigned: ${badgeName} to ${profileId}`);
    }
  } catch (error) {
    console.error("Error assigning badge:", error);
  }
}
async function automateCategory(categoryId) {
  console.log(`
=== Automating category: ${categoryId} ===`);
  const nominated = await autoNominateEligibleProfiles(categoryId);
  console.log(`✅ Auto-nominated ${nominated} profiles`);
  console.log("ℹ️  Run score recalculation separately via scoring service");
  const shortlistResult = await updateShortlists(categoryId);
  console.log(`✅ Shortlist: ${shortlistResult.finalistsCount} finalists, ${shortlistResult.shortlistedCount} shortlisted`);
  console.log("=== Automation complete ===\n");
}
async function finalizeAward(awardId) {
  console.log(`
=== Finalizing award: ${awardId} ===`);
  const { data: categories } = await supabase.from("award_categories").select("id, name").eq("award_id", awardId).eq("is_active", true);
  if (!categories) {
    console.log("No categories found");
    return;
  }
  for (const category of categories) {
    console.log(`
📊 Processing: ${category.name}`);
    await determineWinners(category.id);
  }
  await supabase.from("awards").update({ status: "concluded" }).eq("id", awardId);
  console.log("\n=== Award finalized ===\n");
}
const AutomationService = {
  checkEligibility,
  autoNominateEligibleProfiles,
  updateShortlists,
  determineWinners,
  automateCategory,
  finalizeAward
};

const POST = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { action, awardId, categoryId } = body;
    const supabase = createSupabaseServerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (!profile || profile.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden: Admin access required" }), { status: 403 });
    }
    switch (action) {
      case "auto_nominate":
        if (!categoryId) {
          return new Response(JSON.stringify({ error: "Missing categoryId" }), { status: 400 });
        }
        const nominated = await AutomationService.autoNominateEligibleProfiles(categoryId);
        return new Response(JSON.stringify({
          success: true,
          message: `Auto-nominated ${nominated} profiles`,
          count: nominated
        }), { status: 200 });
      case "update_shortlist":
        if (!categoryId) {
          return new Response(JSON.stringify({ error: "Missing categoryId" }), { status: 400 });
        }
        const shortlistResult = await AutomationService.updateShortlists(categoryId);
        return new Response(JSON.stringify({
          success: true,
          message: "Shortlist updated",
          data: shortlistResult
        }), { status: 200 });
      case "determine_winners":
        if (!categoryId) {
          return new Response(JSON.stringify({ error: "Missing categoryId" }), { status: 400 });
        }
        await AutomationService.determineWinners(categoryId);
        return new Response(JSON.stringify({
          success: true,
          message: "Winners determined"
        }), { status: 200 });
      case "automate_category":
        if (!categoryId) {
          return new Response(JSON.stringify({ error: "Missing categoryId" }), { status: 400 });
        }
        await AutomationService.automateCategory(categoryId);
        await ScoringService.recalculateCategory(categoryId);
        return new Response(JSON.stringify({
          success: true,
          message: "Category automation complete"
        }), { status: 200 });
      case "finalize_award":
        if (!awardId) {
          return new Response(JSON.stringify({ error: "Missing awardId" }), { status: 400 });
        }
        await AutomationService.finalizeAward(awardId);
        return new Response(JSON.stringify({
          success: true,
          message: "Award finalized"
        }), { status: 200 });
      default:
        return new Response(JSON.stringify({
          error: "Invalid action. Use: auto_nominate, update_shortlist, determine_winners, automate_category, finalize_award"
        }), { status: 400 });
    }
  } catch (error) {
    console.error("Automation error:", error);
    return new Response(JSON.stringify({
      error: "Automation failed",
      details: error.message
    }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
