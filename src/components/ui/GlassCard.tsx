import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard = ({ children, className = '', hoverEffect = false }: GlassCardProps) => {
    return (
        <div
            className={`
        bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6
        ${hoverEffect ? 'hover:shadow-2xl hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default GlassCard;
