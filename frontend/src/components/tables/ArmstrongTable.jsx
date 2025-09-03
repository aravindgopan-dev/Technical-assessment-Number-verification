import React from 'react';
import DataTable from './DataTable';
import StatusBadge from '../ui/StatusBadge';

function ArmstrongTable({ armstrongNumbers, loading = false }) {
    const columns = [
        {
            header: 'Number',
            key: 'number',
            render: (armstrong) => (
                <div className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                    {armstrong.number}
                </div>
            )
        },
        {
            header: 'Armstrong Status',
            key: 'is_armstrong',
            render: (armstrong) => (
                <StatusBadge status={armstrong.is_armstrong} type="armstrong" />
            )
        },
        {
            header: 'Verified Date',
            key: 'created_at',
            render: (armstrong) => (
                <div className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                    {armstrong.created_at ? new Date(armstrong.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : 'N/A'}
                </div>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={armstrongNumbers}
            loading={loading}
            emptyMessage="No Armstrong numbers found yet."
            emptyIcon="calculator"
        />
    );
}

export default ArmstrongTable;
