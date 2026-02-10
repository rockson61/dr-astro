
import React, { useState } from 'react';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';

interface FollowButtonProps {
    profileId: string;
    initialIsFollowing?: boolean;
    isOwnProfile?: boolean;
}

export default function FollowButton({ profileId, initialIsFollowing = false, isOwnProfile = false }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [loading, setLoading] = useState(false);

    if (isOwnProfile) return null;

    const toggleFollow = async () => {
        setLoading(true);
        try {
            const action = isFollowing ? 'unfollow' : 'follow';
            const response = await fetch('/api/social/follow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target_id: profileId, action })
            });

            if (response.ok) {
                setIsFollowing(!isFollowing);
                if (window.showToast) {
                    window.showToast(isFollowing ? 'Unfollowed successfully' : 'Followed successfully', 'success');
                }
            } else {
                if (window.showToast) window.showToast('Please login to follow', 'error');
            }
        } catch (error) {
            console.error('Follow error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleFollow}
            disabled={loading}
            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${isFollowing
                    ? 'bg-white text-tuio-red border-2 border-tuio-red hover:bg-tuio-red hover:text-white'
                    : 'bg-tuio-red text-white hover:bg-white hover:text-tuio-red'
                }`}
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : isFollowing ? (
                <>
                    <UserCheck className="w-5 h-5" /> Following
                </>
            ) : (
                <>
                    <UserPlus className="w-5 h-5" /> Follow
                </>
            )}
        </button>
    );
}
