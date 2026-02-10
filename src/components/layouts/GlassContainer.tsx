import React from 'react';

interface GlassContainerProps {
    children: React.ReactNode;
    className?: string;
}

const GlassContainer = ({ children, className = '' }: GlassContainerProps) => {
    return (
        <div className={`min-h-screen bg-gradient-to-br from-red-50 via-red-50 to-red-50 ${className}`}>
            {children}
        </div>
    );
};

export default GlassContainer;
