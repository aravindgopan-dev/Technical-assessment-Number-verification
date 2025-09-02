import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserById } from '../utils/api';

function UserDetails() {
    const { userId } = useParams();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [armstrongNumbers, setArmstrongNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadUserDetails = async () => {
        try {
            setLoading(true);
            const data = await getUserById(userId);
            setUser(data.user);
            setArmstrongNumbers(data.armstrong_numbers || []);
        } catch (error) {
            console.error('Failed to load user details:', error);
            setError('Failed to load user details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            loadUserDetails();
        }
    }, [userId]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="card">
                        <div className="flex items-center justify-center">
                            <div className="inline-flex items-center text-slate-400">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading user details...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="card">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/20 mb-6">
                                <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-white mb-2">Error</h2>
                            <p className="text-slate-400 mb-6">{error}</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={loadUserDetails}
                                    className="btn-primary"
                                >
                                    Try Again
                                </button>
                                <Link
                                    to="/dashboard"
                                    className="btn-secondary"
                                >
                                    Back to Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="card">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-500/20 mb-6">
                                <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-white mb-2">User Not Found</h2>
                            <p className="text-slate-400 mb-6">The requested user could not be found.</p>
                            <Link
                                to="/dashboard"
                                className="btn-primary"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="mb-6 sm:mb-0">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h1 className="text-4xl font-bold text-white">User Details</h1>
                            </div>
                            <p className="text-gray-400 text-lg">View user information and Armstrong numbers</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                to="/dashboard"
                                className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-xl border border-gray-600/50 hover:border-green-500/50 transition-all duration-200 backdrop-blur-sm"
                            >
                                ← Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-200 backdrop-blur-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Name Card */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">Name</span>
                        </div>
                        <p className="text-lg font-semibold text-white">{user.name || 'N/A'}</p>
                    </div>

                    {/* Email Card */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">Email</span>
                        </div>
                        <p className="text-lg font-semibold text-white">{user.email}</p>
                    </div>

                    {/* User ID Card */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">User ID</span>
                        </div>
                        <p className="text-lg font-semibold text-white font-mono">{user.user_id}</p>
                    </div>

                    {/* Status Card */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">Status</span>
                        </div>
                        <div className="flex items-center">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${user.is_verified || user.verified || user.active !== false
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.is_verified || user.verified || user.active !== false
                                    ? 'bg-green-400'
                                    : 'bg-red-400'
                                    }`}></div>
                                {user.is_verified || user.verified || user.active !== false ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Armstrong Numbers */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300">
                    <div className="px-8 py-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Armstrong Numbers</h2>
                            </div>
                            <span className="bg-green-500/20 text-green-400 text-sm font-semibold px-4 py-2 rounded-full border border-green-500/30 backdrop-blur-sm">
                                {armstrongNumbers.length} found
                            </span>
                        </div>
                    </div>

                    {armstrongNumbers.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-500/20 mb-6">
                                <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-lg mb-2">No Armstrong numbers found for this user yet.</p>
                            <p className="text-sm">They can start verifying numbers from the verification page.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-700/50">
                                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                            Number
                                        </th>
                                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                            Armstrong Status
                                        </th>
                                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                            Verified Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {armstrongNumbers.map((armstrong, index) => (
                                        <tr key={index} className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-200 group">
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                                    {armstrong.number}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${armstrong.is_armstrong
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                    }`}>
                                                    {armstrong.is_armstrong ? 'Armstrong' : 'Not Armstrong'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                                                    {armstrong.created_at ? new Date(armstrong.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) : 'N/A'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
