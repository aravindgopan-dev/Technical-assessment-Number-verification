import React from 'react';
import Icon from '../ui/Icon';

function InfoCard({
    icon,
    label,
    value,
    className = ""
}) {
    return (
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300 ${className}`}>
            <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <Icon name={icon} size="sm" className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">{label}</span>
            </div>
            <p className="text-lg font-semibold text-white">{value}</p>
        </div>
    );
}

export default InfoCard;
