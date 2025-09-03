import React from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    loadingText = "Loading...",
    className = "",
    onClick,
    ...props
}) {
    const getVariantClasses = () => {
        switch (variant) {
            case "primary":
                return "btn-primary";
            case "secondary":
                return "btn-secondary";
            case "danger":
                return "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50";
            case "ghost":
                return "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:border-green-500/50";
            default:
                return "btn-primary";
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case "sm":
                return "px-3 py-1 text-sm";
            case "md":
                return "px-4 py-2";
            case "lg":
                return "px-6 py-3 text-lg";
            default:
                return "px-4 py-2";
        }
    };

    const baseClasses = "font-semibold rounded-lg border transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center">
                    <LoadingSpinner size="sm" text="" />
                    <span className="ml-2">{loadingText}</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;
