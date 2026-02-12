import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';

const supabase = createSupabaseBrowserClient();

interface FollowButtonProps {
    targetUserId: string;
    targetUserName?: string; // For notification
}

export default function FollowButton({ targetUserId, targetUserName }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

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
            return; // Can't follow self
        }

        const { data } = await supabase
            .from('follows')
            .select('*')
            .eq('follower_id', user.id)
            .eq('following_id', targetUserId)
            .single();

        if (data) setIsFollowing(true);
        setIsLoading(false);
    };

    const handleFollowToggle = async () => {
        if (!currentUserId) {
            window.location.href = '/login';
            return;
        }

        setIsLoading(true);
        if (isFollowing) {
            // Unfollow
            const { error } = await supabase
                .from('follows')
                .delete()
                .eq('follower_id', currentUserId)
                .eq('following_id', targetUserId);

            if (!error) setIsFollowing(false);
        } else {
            // Follow
            const { error } = await supabase
                .from('follows')
                .insert({
                    follower_id: currentUserId,
                    following_id: targetUserId
                });

            if (!error) {
                setIsFollowing(true);
                // Trigger Notification
                await supabase.from('notifications').insert({
                    user_id: targetUserId,
                    type: 'follow',
                    title: 'New Follower',
                    message: 'Someone started following you!', // detailed info needs sender name fetch
                    link: `/profile/${currentUserId}`, // Assuming public profile link
                    is_read: false
                });
            }
        }
        setIsLoading(false);
    };

    if (!currentUserId || currentUserId === targetUserId) return null;

    return (
        <button
            onClick={handleFollowToggle}
            disabled={isLoading}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${isFollowing
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-500 group'
                    : 'bg-tuio-red text-white hover:bg-tuio-navy shadow-md hover:shadow-lg'
                }`}
        >
            {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : isFollowing ? (
                <>
                    <UserCheck size={16} className="group-hover:hidden" />
                    <span className="group-hover:hidden">Following</span>
                    <span className="hidden group-hover:inline">Unfollow</span>
                </>
            ) : (
                <>
                    <UserPlus size={16} />
                    <span>Follow</span>
                </>
            )}
        </button>
    );
}
