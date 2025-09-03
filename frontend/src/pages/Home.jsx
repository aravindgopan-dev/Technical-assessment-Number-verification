import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/layout/PageContainer';
import Header from '../components/layout/Header';
import FeatureCard from '../components/cards/FeatureCard';

function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <PageContainer>
            <Header />

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
                        <FeatureCard
                            icon="lock"
                            title="Secure Authentication"
                            description="Advanced security with JWT tokens, email verification, and protected routes for enterprise-grade protection"
                            gradient="from-blue-500 to-blue-600"
                        />
                        <FeatureCard
                            icon="calculator"
                            title="Armstrong Verification"
                            description="Intelligent number verification with real-time processing and comprehensive tracking of your mathematical discoveries"
                        />
                        <FeatureCard
                            icon="users"
                            title="User Management"
                            description="Comprehensive dashboard with advanced analytics, user insights, and detailed Armstrong number tracking"
                            gradient="from-green-600 to-green-400"
                        />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

export default Home;
