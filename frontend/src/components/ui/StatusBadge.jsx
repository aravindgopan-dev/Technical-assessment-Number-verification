import React from 'react';

function StatusBadge({ status, type = "default", className = "" }) {
    const getStatusClasses = () => {
        switch (type) {
            case "armstrong":
                return status
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30';
            case "user":
                return status
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30';
            case "count":
                return status > 0
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
        }
    };

    const getStatusText = () => {
        switch (type) {
            case "armstrong":
                return status ? 'Armstrong' : 'Not Armstrong';
            case "user":
                return status ? 'Active' : 'Inactive';
            case "count":
                return status || 0;
            default:
                return status;
        }
    };

    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusClasses()} ${className}`}>
            {type === "user" && (
                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status ? 'bg-green-400' : 'bg-red-400'}`}></div>
            )}
            {getStatusText()}
        </span>
    );
}

export default StatusBadge;
