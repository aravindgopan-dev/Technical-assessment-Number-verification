import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../forms/Button';
import Icon from '../ui/Icon';

function DashboardHeader({ onLogout }) {
    return (
        <div className="mb-2 flex-shrink-0">
            {/* Top Row - Title and Action Buttons */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                        <Icon name="dashboard" size="sm" className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Armstrong Dashboard</h1>
                </div>
                <div className="flex space-x-2">
                    <Link
                        to="/verify"
                        className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-lg border border-gray-600/50 hover:border-green-500/50 transition-all duration-200 backdrop-blur-sm text-sm"
                    >
                        Verify Numbers
                    </Link>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;
