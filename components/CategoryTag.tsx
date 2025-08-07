
import React from 'react';
import { Category } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface CategoryTagProps {
    category: Category;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
    const colorClass = CATEGORY_COLORS[category] || 'bg-gray-200 text-gray-800';

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
            {category}
        </span>
    );
};
