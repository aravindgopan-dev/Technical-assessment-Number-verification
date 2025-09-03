import React from 'react';
import Icon from '../ui/Icon';

function FeatureCard({
    icon,
    title,
    description,
    gradient = "from-green-500 to-emerald-500",
    className = ""
}) {
    return (
        <div className={`card group hover:scale-105 transition-all duration-300 ${className}`}>
            <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={icon} size="xl" className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}

export default FeatureCard;
