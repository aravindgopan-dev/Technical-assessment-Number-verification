import React from 'react';
import Card from '../layout/Card';

function FormContainer({
    title,
    subtitle,
    children,
    className = "",
    icon = null
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 animate-fade-in">
                <Card className={className}>
                    <div className="text-center mb-8">
                        {icon && (
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
                                {icon}
                            </div>
                        )}
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-slate-400">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {children}
                </Card>
            </div>
        </div>
    );
}

export default FormContainer;
