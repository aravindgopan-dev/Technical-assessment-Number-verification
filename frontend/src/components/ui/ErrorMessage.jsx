import React from 'react';

function ErrorMessage({ message, className = "" }) {
    if (!message) return null;

    return (
        <div className={`bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm ${className}`}>
            {message}
        </div>
    );
}

export default ErrorMessage;
