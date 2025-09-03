import React from 'react';
import ViewToggle from './ViewToggle';
import SearchInput from './SearchInput';
import ErrorMessage from '../ui/ErrorMessage';

function DashboardControls({
    viewMode,
    onViewModeChange,
    searchTerm,
    onSearch,
    error
}) {
    return (
        <div className="flex justify-between items-center">
            <ViewToggle
                viewMode={viewMode}
                onViewModeChange={onViewModeChange}
            />

            {/* Search Input - Only show for global users view */}
            {viewMode === 'global' && (
                <SearchInput
                    searchTerm={searchTerm}
                    onSearch={onSearch}
                />
            )}
        </div>
    );
}

export default DashboardControls;
