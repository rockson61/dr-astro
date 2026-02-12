'use client';

import React, { useEffect, useState } from 'react';
import { Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export interface LeaderboardUser {
    profile_id: string;
    reputation: number;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    specialty?: string;
    is_verified?: boolean;
    slug?: string;
}

interface LeaderboardProps {
    initialLeaders?: LeaderboardUser[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ initialLeaders = [] }) => {
    const [leaders, setLeaders] = useState<LeaderboardUser[]>(initialLeaders);
    const [loading, setLoading] = useState(initialLeaders.length === 0);

    useEffect(() => {
        if (initialLeaders.length === 0) {
            fetchLeaderboard();
        }
    }, []);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);

            // Try to fetch from profile_composite_reputation view first
            let { data, error } = await (supabase
                .from('profile_composite_reputation') as any)
                .select(`
          profile_id,
          reputation,
          profiles:profile_id (
            first_name,
            last_name,
            avatar_url,
            specialty,
            is_verified,
            slug
          )
        `)
                .order('reputation', { ascending: false })
                .limit(10);

            // If the view doesn't exist, calculate reputation manually
            if (error) {
                console.log('View does not exist, calculating reputation manually...');

                // Fetch all profiles with their related data
                const { data: profiles, error: profilesError } = await (supabase
                    .from('profiles') as any)
                    .select(`
            id,
            first_name,
            last_name,
            avatar_url,
            specialty,
            is_verified,
            slug
          `)
                    .not('full_name', 'is', null)
                    .limit(50);

                if (profilesError) {
                    console.error('Error fetching profiles:', profilesError);
                    return;
                }

                // Calculate reputation for each profile
                const profilesWithReputation = await Promise.all(
                    (profiles || []).map(async (profile: { id: string; first_name: string; last_name: string; full_name?: string; avatar_url?: string; specialty?: string; is_verified?: boolean; slug?: string }) => {
                        // Get article count
                        const { count: articlesCount } = await (supabase
                            .from('articles') as any)
                            .select('*', { count: 'exact', head: true })
                            .eq('user_id', profile.id)
                            .eq('is_approved', true);

                        // Get article likes
                        const { data: articles } = await (supabase
                            .from('articles') as any)
                            .select('id')
                            .eq('user_id', profile.id)
                            .eq('is_approved', true);

                        let articleLikes = 0;
                        if (articles && articles.length > 0) {
                            const articleIds = articles.map((a: { id: string }) => a.id);
                            const { count: likesCount } = await (supabase
                                .from('article_likes') as any)
                                .select('*', { count: 'exact', head: true })
                                .in('article_id', articleIds);
                            articleLikes = likesCount || 0;
                        }

                        // Get average rating
                        const { data: ratings } = await (supabase
                            .from('profile_ratings') as any)
                            .select('rating')
                            .eq('profile_id', profile.id);

                        const avgRating = ratings && ratings.length > 0
                            ? ratings.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / ratings.length
                            : 0;

                        // Calculate reputation using the formula: (avg_rating × 50) + (article_likes × 2) + (articles × 1)
                        const reputation = Math.round(
                            (avgRating * 50) + (articleLikes * 2) + ((articlesCount || 0) * 1)
                        );

                        return {
                            profile_id: profile.id,
                            reputation,

                            first_name: profile.first_name || '',
                            last_name: profile.last_name || '',
                            full_name: profile.first_name && profile.last_name ? `${profile.first_name} ${profile.last_name}` : (profile.first_name || 'Anonymous User'),
                            avatar_url: profile.avatar_url,
                            specialty: profile.specialty,
                            is_verified: profile.is_verified,
                            slug: profile.slug
                        };
                    })
                );

                // Sort by reputation and take top 10
                const topTen = profilesWithReputation
                    .sort((a, b) => b.reputation - a.reputation)
                    .slice(0, 10)
                //.filter(p => p.reputation > 0); // Commented out to ensure we show *someone* even if scores are low initially

                if (topTen.length === 0) {
                    setLeaders([]);
                    return;
                }

                setLeaders(topTen);
                return;
            }

            if (error) {
                console.error('Error fetching leaderboard:', error);
                return;
            }

            // Transform the data from view
            const transformedData: LeaderboardUser[] = (data || []).map((item: { profile_id: string; reputation: number; profiles: any | any[] }) => {
                const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
                console.log('Leaderboard Item:', item); // DEBUG log

                return {
                    profile_id: item.profile_id,

                    first_name: profile?.first_name || '',
                    last_name: profile?.last_name || '',
                    full_name: profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : (profile?.first_name || 'Anonymous User'),
                    avatar_url: profile?.avatar_url,
                    specialty: profile?.specialty,
                    is_verified: profile?.is_verified,
                    slug: profile?.slug
                };
            });

            setLeaders(transformedData);
        } catch (err) {
            console.error('Leaderboard fetch error:', err);
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return (
            <div className="py-16 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
                <p className="mt-4 text-white/50">Loading leaderboard...</p>
            </div>
        );
    }

    if (leaders.length === 0 && !loading) {
        return (
            <section className="py-16 text-center">
                <h2 className="text-3xl font-heading uppercase text-white mb-4">
                    <Trophy className="inline-block h-8 w-8 text-primary-500 mr-2" />
                    Top 10 Reputation Leaders
                </h2>
                <p className="text-white/70 mb-4">
                    No leaderboard data available yet. Start contributing to earn reputation!
                </p>
            </section>
        );
    }

    return (
        <section className="py-20 px-4 bg-primary-900 rounded-3xl overflow-hidden relative my-12 mx-4 md:mx-0 shadow-2xl">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 relative z-10"
            >
                <span className="text-primary-300 font-bold uppercase tracking-widest mb-2 block text-sm">Community</span>
                <h2 className="text-4xl md:text-5xl font-heading uppercase text-white mb-4">
                    Reputation <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-white">Leaders</span>
                </h2>
            </motion.div>

            {/* Leaderboard Grid */}
            <div className="grid gap-4 max-w-5xl mx-auto relative z-10">
                {leaders.map((leader, index) => (
                    <motion.div
                        key={leader.profile_id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <a href={`/profile/${leader.slug || leader.profile_id}`}
                            className={`
                  block rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 bg-white/5 backdrop-blur-md group
                `}
                        >
                            <div className="flex items-center gap-4">
                                {/* Rank Number */}
                                <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full shadow-lg ${index < 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' : 'bg-white/10 text-white/70'}`}>
                                    <span className="text-xl font-bold">#{index + 1}</span>
                                </div>

                                {/* Avatar */}
                                <div className="flex-shrink-0 relative">
                                    {leader.avatar_url ? (
                                        <img
                                            src={leader.avatar_url}
                                            alt={`${leader.first_name} ${leader.last_name}`}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md group-hover:border-primary-400 transition-colors"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-primary-800 flex items-center justify-center border-2 border-white/20 group-hover:border-primary-400 transition-colors">
                                            <span className="text-2xl font-bold text-white">
                                                {leader.first_name?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                    )}
                                    {index < 3 && (
                                        <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-1 border-2 border-primary-900">
                                            <Trophy size={12} fill="currentColor" />
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-white truncate group-hover:text-primary-300 transition-colors">
                                            {leader.first_name} {leader.last_name}
                                        </h3>
                                        {leader.is_verified && (
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center" title="Verified">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    {leader.specialty && (
                                        <p className="text-sm text-primary-100/60 truncate">
                                            {leader.specialty}
                                        </p>
                                    )}
                                </div>

                                {/* Reputation Score */}
                                <div className="flex-shrink-0 flex items-center gap-2 bg-primary-800/50 rounded-full px-4 py-2 border border-white/10 group-hover:bg-primary-800 transition-colors">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                                            {leader.reputation.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Leaderboard;
