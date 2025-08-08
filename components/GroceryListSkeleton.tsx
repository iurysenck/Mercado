
import React from 'react';
import { GroceryItemCardSkeleton } from './GroceryItemCardSkeleton';
import { motion } from 'framer-motion';

const SkeletonCategory: React.FC = () => (
    <div className="mb-6">
        <div className="flex justify-between items-center px-2 mb-3 -mx-2 py-2 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-28"></div>
            <div className="h-3 bg-gray-700 rounded w-20"></div>
        </div>
        <div className="space-y-3">
            <GroceryItemCardSkeleton />
            <GroceryItemCardSkeleton />
            <GroceryItemCardSkeleton />
        </div>
    </div>
);

export const GroceryListSkeleton: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flow-root"
        >
             <SkeletonCategory />
             <SkeletonCategory />
        </motion.div>
    );
};
