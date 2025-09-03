import React from 'react';
import Button from '../forms/Button';

function ViewToggle({ viewMode, onViewModeChange }) {
    return (
        <div className="flex space-x-2">
            <Button
                variant={viewMode === 'personal' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('personal')}
            >
                My Armstrong Numbers
            </Button>
            <Button
                variant={viewMode === 'global' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('global')}
            >
                Global Users
            </Button>
        </div>
    );
}

export default ViewToggle;
