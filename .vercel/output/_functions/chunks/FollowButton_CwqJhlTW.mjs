import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Loader2, UserCheck, UserPlus } from 'lucide-react';
import { a as createSupabaseBrowserClient } from './supabase_CFYPoMlB.mjs';

const supabase = createSupabaseBrowserClient();
function FollowButton({ targetUserId, targetUserName }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  useEffect(() => {
    checkFollowStatus();
  }, [targetUserId]);
  const checkFollowStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return;
    }
    setCurrentUserId(user.id);
    if (user.id === targetUserId) {
      setIsLoading(false);
      return;
    }
    const { data } = await supabase.from("follows").select("*").eq("follower_id", user.id).eq("following_id", targetUserId).single();
    if (data) setIsFollowing(true);
    setIsLoading(false);
  };
  const handleFollowToggle = async () => {
    if (!currentUserId) {
      window.location.href = "/login";
      return;
    }
    setIsLoading(true);
    if (isFollowing) {
      const { error } = await supabase.from("follows").delete().eq("follower_id", currentUserId).eq("following_id", targetUserId);
      if (!error) setIsFollowing(false);
    } else {
      const { error } = await supabase.from("follows").insert({
        follower_id: currentUserId,
        following_id: targetUserId
      });
      if (!error) {
        setIsFollowing(true);
        await supabase.from("notifications").insert({
          user_id: targetUserId,
          type: "follow",
          title: "New Follower",
          message: "Someone started following you!",
          // detailed info needs sender name fetch
          link: `/profile/${currentUserId}`,
          // Assuming public profile link
          is_read: false
        });
      }
    }
    setIsLoading(false);
  };
  if (!currentUserId || currentUserId === targetUserId) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleFollowToggle,
      disabled: isLoading,
      className: `px-4 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${isFollowing ? "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-500 group" : "bg-tuio-red text-white hover:bg-tuio-navy shadow-md hover:shadow-lg"}`,
      children: isLoading ? /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }) : isFollowing ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(UserCheck, { size: 16, className: "group-hover:hidden" }),
        /* @__PURE__ */ jsx("span", { className: "group-hover:hidden", children: "Following" }),
        /* @__PURE__ */ jsx("span", { className: "hidden group-hover:inline", children: "Unfollow" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(UserPlus, { size: 16 }),
        /* @__PURE__ */ jsx("span", { children: "Follow" })
      ] })
    }
  );
}

export { FollowButton as F };
