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
        glass-card p-6
        ${hoverEffect ? 'hover:shadow-xl hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-1' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default GlassCard;
