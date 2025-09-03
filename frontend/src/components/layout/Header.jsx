import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="glass border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-gradient">
                            Cooeey
                        </Link>
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
    );
}

export default Header;
