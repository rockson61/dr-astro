import React from 'react';

interface BadgeProps {
    points: number;
    badges: any[];
}

export default function ReputationBadge({ points, badges }: BadgeProps) {
    // Determine Rank
    let rank = "Member";
    let color = "bg-gray-100 text-gray-600";
    let icon = "🌱";

    if (points >= 1000) {
        rank = "Legend";
        color = "bg-purple-100 text-purple-700 border border-purple-200";
        icon = "👑";
    } else if (points >= 500) {
        rank = "Expert";
        color = "bg-yellow-100 text-yellow-700 border border-yellow-200";
        icon = "🏆";
    } else if (points >= 100) {
        rank = "Rising Star";
        color = "bg-blue-100 text-blue-700 border border-blue-200";
        icon = "⭐";
    }

    return (
        <div className="flex flex-col gap-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${color}`}>
                <span>{icon}</span>
                <span>{rank}</span>
                <span className="opacity-50">|</span>
                <span>{points} pts</span>
            </div>

            {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                    {badges.map((b: any, i: number) => (
                        <span key={i} title={b.name} className="text-lg cursor-help">
                            {b.icon}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
