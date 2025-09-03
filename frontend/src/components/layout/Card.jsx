import React from 'react';

function Card({ children, className = "", hover = true }) {
    const baseClasses = "bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8";
    const hoverClasses = hover ? "hover:border-green-500/30 transition-all duration-300" : "";

    return (
        <div className={`${baseClasses} ${hoverClasses} ${className}`}>
            {children}
        </div>
    );
}

export default Card;
