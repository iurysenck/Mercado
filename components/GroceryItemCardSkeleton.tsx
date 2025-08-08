
import React from 'react';

export const GroceryItemCardSkeleton: React.FC = () => {
    return (
        <div className="border border-white/10 bg-white/5 rounded-xl shadow-lg w-full p-3 border-l-4 border-gray-800">
            <div className="flex items-center gap-3 animate-pulse">
                <div className="h-5 w-5 rounded-full border-2 border-gray-700 flex-shrink-0" style={{ minWidth: '1.25rem' }}></div>
                <div className="flex-grow flex items-center justify-between gap-3">
                    <div className="flex-grow space-y-2.5">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="h-5 bg-gray-700 rounded w-16 flex-shrink-0"></div>
                </div>
            </div>
        </div>
    );
};
