'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ProfileReviewsListProps {
    profileId: string;
    onRatingDataUpdate?: (averageRating: number, reviewCount: number) => void;
    minimal?: boolean;
    initialReviews?: any[];
}

type FilterType = 'recent' | 'highest' | 'lowest';

const ProfileReviewsList: React.FC<ProfileReviewsListProps> = ({ profileId, onRatingDataUpdate, minimal = false, limit, initialReviews = [] }) => {
    const [reviews, setReviews] = useState<any[]>(initialReviews);
    const [loading, setLoading] = useState(initialReviews.length === 0);
    const [filter, setFilter] = useState<FilterType>('recent');

    useEffect(() => {
        if (initialReviews.length === 0) {
            const fetchReviews = async () => {
                setLoading(true);
                const { data, error } = await (supabase
                    .from('profile_ratings') as any)
                    .select('*, rater:rater_id(first_name, last_name, avatar_url)')
                    .eq('profile_id', profileId)
                    .order('created_at', { ascending: false });

                if (!error && data) {
                    setReviews(data);

                    // Calculate average rating and notify parent
                    const avgRating = data.reduce((acc: number, r: any) => acc + (r.rating || 0), 0) / data.length;
                    if (onRatingDataUpdate) {
                        onRatingDataUpdate(avgRating || 0, data.length);
                    }
                }
                setLoading(false);
            };
            fetchReviews();
        }
    }, [profileId, onRatingDataUpdate, initialReviews.length]);

    // Calculate rating breakdown
    const ratingBreakdown = useMemo(() => {
        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            const rating = Math.round(review.rating);
            if (rating >= 1 && rating <= 5) {
                breakdown[rating as keyof typeof breakdown]++;
            }
        });
        return breakdown;
    }, [reviews]);

    const averageRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        return reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length;
    }, [reviews]);

    // Filtered and sorted reviews
    const filteredReviews = useMemo(() => {
        const sorted = [...reviews];
        if (filter === 'highest') {
            sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (filter === 'lowest') {
            sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        }
        // 'recent' is already sorted from the query

        if (limit) {
            return sorted.slice(0, limit);
        }
        return sorted;
    }, [reviews, filter, limit]);

    const renderStars = (rating: number, size = 'sm') => {
        const stars = [];
        const sizeClass = size === 'lg' ? 'w-7 h-7' : 'w-4 h-4';

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={`${sizeClass} ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-[24px] shadow-sm p-6 mb-6">
                <div className="text-center py-8 text-gray-500">Loading reviews...</div>
            </div>
        );
    }

    if (!reviews.length) {
        return (
            <div className="bg-white rounded-[24px] shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-tuio uppercase text-tuio-navy mb-4">Reviews</h2>
                <div className="text-center py-12 bg-tuio-bg rounded-xl">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2 text-lg font-medium">No reviews yet</p>
                    <p className="text-gray-500 text-sm">Be the first to leave a review!</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${minimal ? '' : 'bg-white rounded-[24px] shadow-sm p-6 mb-6'}`}>
            {!minimal && (
                <>
                    {/* Header */}
                    <h2 className="text-2xl font-tuio uppercase text-tuio-navy mb-6">
                        Reviews ({reviews.length})
                    </h2>

                    {/* Rating Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-100">
                        {/* Overall Rating */}
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-tuio-navy mb-1">
                                    {averageRating.toFixed(1)}
                                </div>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {renderStars(Math.round(averageRating), 'lg')}
                                </div>
                                <p className="text-gray-600 text-sm">Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map(star => {
                                const count = ratingBreakdown[star as keyof typeof ratingBreakdown];
                                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

                                return (
                                    <div key={star} className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-700 w-12">{star} stars</span>
                                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 transition-all duration-300"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={() => setFilter('recent')}
                            className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors ${filter === 'recent'
                                ? 'bg-tuio-navy text-white'
                                : 'bg-tuio-bg text-tuio-navy hover:bg-gray-200'
                                }`}
                        >
                            Most Recent
                        </button>
                        <button
                            onClick={() => setFilter('highest')}
                            className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors ${filter === 'highest'
                                ? 'bg-tuio-navy text-white'
                                : 'bg-tuio-bg text-tuio-navy hover:bg-gray-200'
                                }`}
                        >
                            Highest Rated
                        </button>
                        <button
                            onClick={() => setFilter('lowest')}
                            className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors ${filter === 'lowest'
                                ? 'bg-tuio-navy text-white'
                                : 'bg-tuio-bg text-tuio-navy hover:bg-gray-200'
                                }`}
                        >
                            Lowest Rated
                        </button>
                    </div>
                </>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {filteredReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                        <div className="flex gap-4">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {review.rater?.avatar_url ? (
                                    <img
                                        src={review.rater.avatar_url}
                                        alt={`${review.rater.first_name} ${review.rater.last_name}`}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-tuio-pink flex items-center justify-center text-lg font-bold text-white">
                                        {`${review.rater?.first_name || ''} ${review.rater?.last_name || ''}`.charAt(0) || '?'}
                                    </div>
                                )}
                            </div>

                            {/* Review Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-tuio-navy">
                                        {review.rater?.first_name ? `${review.rater.first_name} ${review.rater.last_name}` : 'Anonymous User'}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {new Date(review.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                {/* Stars */}
                                <div className="flex items-center gap-1 mb-3">
                                    {renderStars(review.rating)}
                                </div>

                                {/* Comment */}
                                {review.comment && (
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        {review.comment}
                                    </p>
                                )}

                                {/* Helpful Button */}
                                <button className="flex items-center gap-2 text-gray-500 hover:text-tuio-pink transition-colors">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-sm font-medium">Helpful</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileReviewsList;
