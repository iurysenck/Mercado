

import React from 'react';
import { Category } from '../types';
import { getCategoryStyle } from '../constants';

interface CategoryTagProps {
    category: Category;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
    const { tag: colorClass } = getCategoryStyle(category);

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
            {category}
        </span>
    );
};