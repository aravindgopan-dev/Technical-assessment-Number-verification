import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Navigation Header */}
            <nav className="glass border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gradient">Cooeey</h1>
                        </div>
                        <div className="flex space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-slate-300 text-sm">
                                            Welcome, {user?.name || 'User'}
                                        </span>
                                        <Link
                                            to="/dashboard"
                                            className="btn-primary"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/verify"
                                            className="btn-secondary"
                                        >
                                            Verify Numbers
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="text-slate-400 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn-primary"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex items-center justify-center py-20 px-6">
                <div className="max-w-6xl mx-auto text-center animate-fade-in">
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Welcome to{' '}
                            <span className="text-gradient">Cooeey</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Your comprehensive platform for Armstrong number verification and user management.
                            {isAuthenticated
                                ? ' Access your dashboard to verify numbers and manage users.'
                                : ' Get started by registering or logging in to verify Armstrong numbers.'
                            }
                        </p>
                    </div>

                    {!isAuthenticated && (
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                            <Link
                                to="/register"
                                className="btn-primary text-lg px-8 py-4 glow"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/login"
                                className="btn-secondary text-lg px-8 py-4"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}

                    {isAuthenticated && (
                        <div className="mb-16">
                            <Link
                                to="/dashboard"
                                className="btn-primary text-lg px-8 py-4 glow"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-8 mt-20">
                        <div className="card group hover:scale-105 transition-all duration-300">
                            <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Secure Authentication</h3>
                            <p className="text-slate-400 leading-relaxed">Advanced security with JWT tokens, email verification, and protected routes for enterprise-grade protection</p>
                        </div>

                        <div className="card group hover:scale-105 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Armstrong Verification</h3>
                            <p className="text-slate-400 leading-relaxed">Intelligent number verification with real-time processing and comprehensive tracking of your mathematical discoveries</p>
                        </div>

                        <div className="card group hover:scale-105 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-400 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">User Management</h3>
                            <p className="text-slate-400 leading-relaxed">Comprehensive dashboard with advanced analytics, user insights, and detailed Armstrong number tracking</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
