import React from 'react';

interface GlassContainerProps {
    children: React.ReactNode;
    className?: string;
}

const GlassContainer = ({ children, className = '' }: GlassContainerProps) => {
    return (
        <div className={`min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 ${className}`}>
            {children}
        </div>
    );
};

export default GlassContainer;
