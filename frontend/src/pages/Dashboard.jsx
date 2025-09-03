import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, getUserById } from '../utils/api';
import PageContainer from '../components/layout/PageContainer';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardControls from '../components/dashboard/DashboardControls';
import DataSection from '../components/dashboard/DataSection';
import ErrorMessage from '../components/ui/ErrorMessage';

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
        <PageContainer className="h-screen py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                <DashboardHeader onLogout={handleLogout} />

                <div className="mb-2">
                    <DashboardControls
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        searchTerm={searchTerm}
                        onSearch={handleSearch}
                        error={error}
                    />

                    {error && (
                        <ErrorMessage message={error} className="mt-2" />
                    )}
                </div>



                <DataSection
                    viewMode={viewMode}
                    personalArmstrongNumbers={personalArmstrongNumbers}
                    filteredUsers={filteredUsers}
                    loading={loading}
                    searchTerm={searchTerm}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={loadUsers}
                />

            </div>
        </PageContainer>
    );
}

export default Dashboard;
