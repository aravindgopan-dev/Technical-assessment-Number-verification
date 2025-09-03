import React from 'react';
import Card from '../layout/Card';
import Icon from '../ui/Icon';
import ArmstrongTable from '../tables/ArmstrongTable';
import UserTable from '../tables/UserTable';
import LoadingSpinner from '../ui/LoadingSpinner';

function DataSection({
    viewMode,
    personalArmstrongNumbers,
    filteredUsers,
    loading,
    searchTerm,
    currentPage,
    totalPages,
    onPageChange
}) {
    const getSectionIcon = () => {
        return viewMode === 'personal' ? 'calculator' : 'users';
    };

    const getSectionTitle = () => {
        return viewMode === 'personal' ? 'My Armstrong Numbers' : 'All Users';
    };

    const getEmptyMessage = () => {
        if (viewMode === 'personal') {
            return 'No Armstrong numbers found yet.';
        }
        return searchTerm ? `No users found matching "${searchTerm}"` : 'No users found';
    };

    return (
        <Card className="flex-1 flex flex-col p-4">
            <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30 flex-shrink-0">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                        <Icon name={getSectionIcon()} size="sm" className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                        {getSectionTitle()}
                    </h2>
                </div>
            </div>
            <div className="flex-1 overflow-hidden">
                {loading ? (
                    <div className="p-4 text-center">
                        <LoadingSpinner text="Loading..." />
                    </div>
                ) : (
                    <div className="h-full min-h-0 overflow-y-auto overflow-x-auto">
                        {viewMode === 'personal' ? (
                            <ArmstrongTable
                                armstrongNumbers={personalArmstrongNumbers}
                                loading={loading}
                            />
                        ) : (
                            <UserTable
                                users={filteredUsers}
                                loading={loading}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Pagination - Only show for global users view and when there are multiple pages */}
            {viewMode === 'global' && totalPages > 1 && !searchTerm && (
                <div className="px-4 py-3 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30 flex items-center justify-between flex-shrink-0">
                    <div className="text-xs font-medium text-gray-400">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="px-3 py-1 text-xs font-semibold border border-gray-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 hover:border-green-500/50 text-gray-300 hover:text-white transition-all duration-200"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="px-3 py-1 text-xs font-semibold border border-gray-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 hover:border-green-500/50 text-gray-300 hover:text-white transition-all duration-200"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Search Results Info */}
            {viewMode === 'global' && searchTerm && filteredUsers.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30 flex items-center justify-between flex-shrink-0">
                    <div className="text-xs font-medium text-gray-400">
                        Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} matching "{searchTerm}"
                    </div>
                </div>
            )}
        </Card>
    );
}

export default DataSection;
