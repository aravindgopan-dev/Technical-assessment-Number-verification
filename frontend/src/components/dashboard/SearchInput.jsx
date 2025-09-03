import React from 'react';
import Icon from '../ui/Icon';

function SearchInput({ searchTerm, onSearch, placeholder = "Search users by name or email..." }) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" size="sm" className="text-gray-400" />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all duration-200 backdrop-blur-sm text-sm"
            />
            {searchTerm && (
                <button
                    onClick={() => onSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <Icon name="close" size="sm" />
                </button>
            )}
        </div>
    );
}

export default SearchInput;
