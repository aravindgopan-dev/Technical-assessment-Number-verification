import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, getUserById } from '../utils/api';

function Dashboard() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [viewMode, setViewMode] = useState('personal'); // 'personal' or 'global'
    const [personalArmstrongNumbers, setPersonalArmstrongNumbers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [allUsers, setAllUsers] = useState([]); // Store all users for search

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const loadUsers = async (page = 1) => {
        try {
            setLoading(true);
            const data = await getAllUsers(page);
            setUsers(data.users || []);
            setAllUsers(data.users || []); // Store all users for search
            setTotalPages(data.total_pages || 1);
            setCurrentPage(data.page || 1);
            setTotalUsers(data.total || 0);
        } catch (error) {
            console.error('Failed to load users:', error);
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const loadAllUsersForSearch = async () => {
        try {
            setLoading(true);
            // Load all users by getting multiple pages
            let allUsersData = [];
            let page = 1;
            let hasMorePages = true;

            while (hasMorePages) {
                const data = await getAllUsers(page);
                allUsersData = [...allUsersData, ...(data.users || [])];
                hasMorePages = page < data.total_pages;
                page++;
            }

            setAllUsers(allUsersData);
            setUsers(allUsersData.slice(0, 5)); // Show first 5 users initially
            setTotalPages(Math.ceil(allUsersData.length / 5));
            setCurrentPage(1);
            setTotalUsers(allUsersData.length);
        } catch (error) {
            console.error('Failed to load all users:', error);
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    // Filter users based on search term
    const filteredUsers = searchTerm
        ? allUsers.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : users;

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when searching
    };

    const loadPersonalArmstrongNumbers = async () => {
        try {
            setLoading(true);
            // Use UserID from the API response (capital I)
            const userId = user.UserID;

            if (!userId) {
                throw new Error('User ID not found');
            }

            const data = await getUserById(userId);
            setPersonalArmstrongNumbers(data.armstrong_numbers || []);
        } catch (error) {
            console.error('Failed to load personal Armstrong numbers:', error);
            setError('Failed to load your Armstrong numbers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (viewMode === 'personal') {
            loadPersonalArmstrongNumbers();
            setSearchTerm(''); // Clear search when switching to personal view
        } else {
            loadAllUsersForSearch(); // Load all users for search functionality
        }
    }, [viewMode]);

    useEffect(() => {
        // Load personal Armstrong numbers by default
        loadPersonalArmstrongNumbers();
    }, []);

    return (
        <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                {/* Header */}
                <div className="mb-4 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="mb-4 sm:mb-0">
                            <div className="flex items-center mb-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-2">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-white">Armstrong Dashboard</h1>
                            </div>

                        </div>
                        <div className="flex space-x-2">
                            <Link
                                to="/verify"
                                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-lg border border-gray-600/50 hover:border-green-500/50 transition-all duration-200 backdrop-blur-sm text-sm"
                            >
                                Verify Numbers
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all duration-200 backdrop-blur-sm text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setViewMode('personal')}
                                className={`px-4 py-2 font-semibold rounded-lg border transition-all duration-200 backdrop-blur-sm text-sm ${viewMode === 'personal'
                                    ? 'bg-green-500/20 text-green-400 border-green-500/50'
                                    : 'bg-gray-800/50 text-gray-300 border-gray-600/50 hover:border-green-500/50'
                                    }`}
                            >
                                My Armstrong Numbers
                            </button>
                            <button
                                onClick={() => setViewMode('global')}
                                className={`px-4 py-2 font-semibold rounded-lg border transition-all duration-200 backdrop-blur-sm text-sm ${viewMode === 'global'
                                    ? 'bg-green-500/20 text-green-400 border-green-500/50'
                                    : 'bg-gray-800/50 text-gray-300 border-gray-600/50 hover:border-green-500/50'
                                    }`}
                            >
                                Global Users
                            </button>
                        </div>

                        {/* Search Input - Only show for global users view */}
                        {viewMode === 'global' && (
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-64 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all duration-200 backdrop-blur-sm text-sm"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => handleSearch('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm mb-4">
                            {error}
                        </div>
                    )}
                </div>



                {/* Main Content */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300 flex-1 flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30 flex-shrink-0">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                {viewMode === 'personal' ? (
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-white">
                                {viewMode === 'personal' ? 'My Armstrong Numbers' : 'All Users'}
                            </h2>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        {loading ? (
                            <div className="p-6 text-center">
                                <div className="inline-flex items-center text-slate-400">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </div>
                            </div>
                        ) : viewMode === 'personal' ? (
                            personalArmstrongNumbers.length === 0 ? (
                                <div className="p-6 text-center text-slate-400">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-slate-500/20 mb-4">
                                        <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm mb-1">No Armstrong numbers found yet.</p>
                                    <p className="text-xs">Start verifying numbers from the verification page.</p>
                                </div>
                            ) : (
                                <div className="h-full overflow-auto">
                                    <table className="min-w-full">
                                        <thead className="sticky top-0 bg-gray-900/95 backdrop-blur-sm">
                                            <tr className="border-b border-gray-700/50">
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                    Number
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                    Armstrong Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                    Verified Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {personalArmstrongNumbers.map((armstrong, index) => (
                                                <tr key={index} className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-200 group">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                                                            {armstrong.number}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${armstrong.is_armstrong
                                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                            }`}>
                                                            {armstrong.is_armstrong ? 'Armstrong' : 'Not Armstrong'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
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
                            )
                        ) : filteredUsers.length === 0 ? (
                            <div className="p-6 text-center text-slate-400">
                                {searchTerm ? `No users found matching "${searchTerm}"` : 'No users found'}
                            </div>
                        ) : (
                            <div className="h-full overflow-auto">
                                <table className="min-w-full">
                                    <thead className="sticky top-0 bg-gray-900/95 backdrop-blur-sm">
                                        <tr className="border-b border-gray-700/50">
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                Armstrong Count
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                Joined
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((userItem) => (
                                            <tr key={userItem.user_id} className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-200 group">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link
                                                        to={`/users/${userItem.user_id}`}
                                                        className="text-lg font-bold text-white group-hover:text-green-400 transition-colors"
                                                    >
                                                        {userItem.name || 'N/A'}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                                                        {userItem.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${(userItem.armstrong_count || 0) > 0
                                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                                        }`}>
                                                        {userItem.armstrong_count || 0}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                                                        {userItem.created_at ? new Date(userItem.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
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

                    {totalPages > 1 && !searchTerm && (
                        <div className="px-6 py-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30 flex items-center justify-between flex-shrink-0">
                            <div className="text-xs font-medium text-gray-400">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => loadUsers(currentPage - 1)}
                                    disabled={currentPage <= 1}
                                    className="px-3 py-1 text-xs font-semibold border border-gray-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 hover:border-green-500/50 text-gray-300 hover:text-white transition-all duration-200"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => loadUsers(currentPage + 1)}
                                    disabled={currentPage >= totalPages}
                                    className="px-3 py-1 text-xs font-semibold border border-gray-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 hover:border-green-500/50 text-gray-300 hover:text-white transition-all duration-200"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Search Results Info */}
                    {searchTerm && filteredUsers.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30 flex items-center justify-between flex-shrink-0">
                            <div className="text-xs font-medium text-gray-400">
                                Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} matching "{searchTerm}"
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
