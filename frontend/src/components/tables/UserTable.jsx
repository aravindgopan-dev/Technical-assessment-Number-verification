import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from './DataTable';
import StatusBadge from '../ui/StatusBadge';

function UserTable({ users, loading = false }) {
    const columns = [
        {
            header: 'User',
            key: 'name',
            render: (user) => (
                <Link
                    to={`/users/${user.user_id}`}
                    className="text-lg font-bold text-white group-hover:text-green-400 transition-colors"
                >
                    {user.name || 'N/A'}
                </Link>
            )
        },
        {
            header: 'Email',
            key: 'email',
            render: (user) => (
                <div className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                    {user.email}
                </div>
            )
        },
        {
            header: 'Armstrong Count',
            key: 'armstrong_count',
            render: (user) => (
                <StatusBadge status={user.armstrong_count} type="count" />
            )
        },
        {
            header: 'Joined',
            key: 'created_at',
            render: (user) => (
                <div className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }) : 'N/A'}
                </div>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={users}
            loading={loading}
            emptyMessage="No users found"
            emptyIcon="users"
        />
    );
}

export default UserTable;
