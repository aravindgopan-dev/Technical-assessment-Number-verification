import React from 'react';

function PageContainer({ children, className = "" }) {
    return (
        <div className={`min-h-screen bg-gradient-to-br from-black via-gray-900 to-black ${className}`}>
            {children}
        </div>
    );
}

export default PageContainer;
