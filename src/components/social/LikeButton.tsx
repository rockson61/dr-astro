
import React, { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';

interface LikeButtonProps {
    articleId: string;
    initialLikes?: number;
    initialIsLiked?: boolean;
}

export default function LikeButton({ articleId, initialLikes = 0, initialIsLiked = false }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [loading, setLoading] = useState(false);

    const toggleLike = async () => {
        if (loading) return;
        setLoading(true);

        // Optimistic UI update
        const previousState = isLiked;
        const previousCount = likesCount;

        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

        try {
            const action = !previousState ? 'like' : 'unlike';
            const response = await fetch('/api/social/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ article_id: articleId, action })
            });

            if (!response.ok) {
                // Revert on error
                setIsLiked(previousState);
                setLikesCount(previousCount);
                if (window.showToast) window.showToast('Please login to like articles', 'error');
            }
        } catch (error) {
            console.error('Like error:', error);
            setIsLiked(previousState);
            setLikesCount(previousCount);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all group ${isLiked
                    ? 'bg-red-50 text-red-500'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
        >
            <Heart
                className={`w-5 h-5 transition-transform ${isLiked ? 'fill-red-500 scale-110' : 'group-hover:scale-110'
                    }`}
            />
            <span className="font-bold">{likesCount}</span>
        </button>
    );
}
