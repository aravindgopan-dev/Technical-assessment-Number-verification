import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserById } from '../utils/api';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/layout/Card';
import InfoCard from '../components/cards/InfoCard';
import ArmstrongTable from '../components/tables/ArmstrongTable';
import Button from '../components/forms/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import Icon from '../components/ui/Icon';

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
            <PageContainer className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <div className="flex items-center justify-center">
                            <LoadingSpinner text="Loading user details..." />
                        </div>
                    </Card>
                </div>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/20 mb-6">
                                <Icon name="error" size="xl" className="text-red-400" />
                            </div>
                            <h2 className="text-2xl font-semibold text-white mb-2">Error</h2>
                            <p className="text-slate-400 mb-6">{error}</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button onClick={loadUserDetails}>
                                    Try Again
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Back to Dashboard
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </PageContainer>
        );
    }

    if (!user) {
        return (
            <PageContainer className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-500/20 mb-6">
                                <Icon name="user" size="xl" className="text-slate-400" />
                            </div>
                            <h2 className="text-2xl font-semibold text-white mb-2">User Not Found</h2>
                            <p className="text-slate-400 mb-6">The requested user could not be found.</p>
                            <Button onClick={() => navigate('/dashboard')}>
                                Back to Dashboard
                            </Button>
                        </div>
                    </Card>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="mb-6 sm:mb-0">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                    <Icon name="user" size="sm" className="text-white" />
                                </div>
                                <h1 className="text-4xl font-bold text-white">User Details</h1>
                            </div>
                            <p className="text-gray-400 text-lg">View user information and Armstrong numbers</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={() => navigate('/dashboard')}
                            >
                                ← Dashboard
                            </Button>
                            <Button
                                variant="danger"
                                size="lg"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* User Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <InfoCard
                        icon="user"
                        label="Name"
                        value={user.name || 'N/A'}
                    />
                    <InfoCard
                        icon="email"
                        label="Email"
                        value={user.email}
                    />
                    <InfoCard
                        icon="id"
                        label="User ID"
                        value={user.user_id}
                    />
                    <InfoCard
                        icon="check"
                        label="Status"
                        value={
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
                        }
                    />
                </div>

                {/* Armstrong Numbers */}
                <Card className="overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="calculator" size="md" className="text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Armstrong Numbers</h2>
                            </div>
                            <span className="bg-green-500/20 text-green-400 text-sm font-semibold px-4 py-2 rounded-full border border-green-500/30 backdrop-blur-sm">
                                {armstrongNumbers.length} found
                            </span>
                        </div>
                    </div>

                    <ArmstrongTable
                        armstrongNumbers={armstrongNumbers}
                        loading={false}
                    />
                </Card>
            </div>
        </PageContainer>
    );
}

export default UserDetails;
