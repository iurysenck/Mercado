

import React from 'react';
import { Category } from '../types';
import { getCategoryStyle } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';

interface CategoryFilterProps {
    selectedCategories: Category[];
    onToggleCategory: (category: Category) => void;
    availableCategories: Category[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onToggleCategory, availableCategories }) => {
    if (availableCategories.length === 0) {
        return null;
    }
    
    return (
        <div className="flex flex-wrap gap-2 py-2">
            <AnimatePresence>
            {availableCategories.map(category => {
                const isSelected = selectedCategories.includes(category);
                const style = getCategoryStyle(category);
                const unselectedClasses = `bg-gray-800/50 border-gray-700/80 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200`;
                
                return (
                    <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        key={category}
                        onClick={() => onToggleCategory(category)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-all duration-200 border ${isSelected ? style.tag : unselectedClasses }`}
                    >
                        {category}
                    </motion.button>
                );
            })}
            </AnimatePresence>
        </div>
    );
};