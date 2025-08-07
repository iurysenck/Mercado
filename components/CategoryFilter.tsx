import React from 'react';
import { Category } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface CategoryFilterProps {
    selectedCategories: Category[];
    onToggleCategory: (category: Category) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onToggleCategory }) => {
    return (
        <div className="flex flex-wrap gap-2 py-2">
            {Object.values(Category).map(category => {
                const isSelected = selectedCategories.includes(category);
                const unselectedClasses = `bg-gray-800/50 border-gray-700/80 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200`;
                
                return (
                    <button
                        key={category}
                        onClick={() => onToggleCategory(category)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-all duration-200 border ${isSelected ? CATEGORY_COLORS[category] : unselectedClasses }`}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
};
