import { createClient } from '@supabase/supabase-js';

const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlzcyI6InN1cGFiYXNlIn0.QD1T3hz_0RBrnt-juLttpON4cdDyl1trbrV0zf7B6Ro";
const publicUrl = "http://api.db.dentaloffice.io";
let supabaseAdmin = null;
{
  supabaseAdmin = createClient(publicUrl, serviceRoleKey);
}
const POINTS = {
  PUBLISH_ARTICLE: 50,
  COMMENT: 5,
  RECEIVE_LIKE: 10,
  // Author gets this
  LIKE_CONTENT: 1,
  // User gets this
  COMPLETE_PROFILE: 20
};
async function awardPoints(userId, action, points, metadata = {}) {
  try {
    if (!supabaseAdmin) return;
    const { error: logError } = await supabaseAdmin.from("reputation_logs").insert({
      user_id: userId,
      action,
      points,
      metadata
    });
    if (logError) throw logError;
    const { data: profile } = await supabaseAdmin.from("profiles").select("reputation_points, badges").eq("id", userId).single();
    if (profile) {
      const newScore = (profile.reputation_points || 0) + points;
      await supabaseAdmin.from("profiles").update({ reputation_points: newScore }).eq("id", userId);
      await checkBadges(userId, newScore, profile.badges || []);
    }
  } catch (error) {
    console.error("Error awarding points:", error);
  }
}
async function checkBadges(userId, score, currentBadges) {
  const badgesToAdd = [];
  const existingIds = currentBadges.map((b) => b.id);
  if (score >= 100 && !existingIds.includes("rising_star")) {
    badgesToAdd.push({
      id: "rising_star",
      name: "Rising Star",
      icon: "🌟",
      awarded_at: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  if (score >= 500 && !existingIds.includes("community_pillar")) {
    badgesToAdd.push({
      id: "community_pillar",
      name: "Community Pillar",
      icon: "🏛️",
      awarded_at: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  if (badgesToAdd.length > 0) {
    const newBadges = [...currentBadges, ...badgesToAdd];
    await supabaseAdmin.from("profiles").update({ badges: newBadges }).eq("id", userId);
  }
}

export { POINTS, awardPoints };
