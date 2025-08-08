

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../types';
import { getCategoryStyle } from '../constants';

interface CategoryNavigatorProps {
    categories: Category[];
    activeCategory: Category | null;
    onCategoryClick: (category: Category) => void;
}

export const CategoryNavigator: React.FC<CategoryNavigatorProps> = ({ categories, activeCategory, onCategoryClick }) => {
    
    if (categories.length <= 1) {
        return null;
    }

    // This outer div now controls the positioning, taking full viewport height and using flexbox to center.
    return (
        <div className="fixed inset-y-0 right-4 z-20 flex items-center pointer-events-none">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="pointer-events-auto"
            >
                <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-full flex flex-col items-center gap-1 p-1">
                    <AnimatePresence>
                    {categories.map(category => {
                        const isActive = category === activeCategory;
                        const { tag } = getCategoryStyle(category);
                        
                        return (
                            <div key={category} className="relative group">
                                <button
                                    onClick={() => onCategoryClick(category)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${isActive ? 'bg-blue-500 text-white scale-110 shadow-lg' : `${tag} hover:brightness-125`}`}
                                    aria-label={`Ir para a categoria ${category}`}
                                >
                                    <span className="text-xs font-bold uppercase select-none">
                                        {category.charAt(0)}
                                    </span>
                                </button>
                                 <div className="absolute top-1/2 -translate-y-1/2 right-full mr-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    {category}
                                </div>
                            </div>
                        );
                    })}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};