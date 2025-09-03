import React from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

function DataTable({
    columns,
    data,
    loading = false,
    emptyMessage = "No data found",
    emptyIcon = "error",
    className = ""
}) {
    if (loading) {
        return (
            <div className="p-6 text-center">
                <LoadingSpinner text="Loading..." />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="p-6 text-center text-slate-400">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-slate-500/20 mb-4">
                    <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="text-sm mb-1">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className={className}>
            <table className="min-w-full table-auto">
                <thead className="sticky top-0 bg-gray-900/95 backdrop-blur-sm">
                    <tr className="border-b border-gray-700/50">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-200 group"
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap"
                                >
                                    {column.render ? column.render(row, rowIndex) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
