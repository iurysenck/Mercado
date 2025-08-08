
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Category } from '../types';
import { getCategoryStyle } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface CategoryFilterProps {
    selectedCategories: Category[];
    onToggleCategory: (category: Category) => void;
    availableCategories: Category[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onToggleCategory, availableCategories }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const checkScroll = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            const scrollBuffer = 2; // to account for sub-pixel rendering issues
            setShowLeftArrow(hasOverflow && el.scrollLeft > scrollBuffer);
            setShowRightArrow(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - scrollBuffer);
        }
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el) {
            let timeoutId: number;
            const debouncedCheckScroll = () => {
                window.clearTimeout(timeoutId);
                timeoutId = window.setTimeout(checkScroll, 100);
            };

            checkScroll(); // Initial check

            // Debounce scroll and resize events for performance
            el.addEventListener('scroll', debouncedCheckScroll, { passive: true });
            window.addEventListener('resize', debouncedCheckScroll);

            const observer = new MutationObserver(checkScroll);
            observer.observe(el, { childList: true, subtree: true });

            return () => {
                window.clearTimeout(timeoutId); // Clean up timeout on unmount
                el.removeEventListener('scroll', debouncedCheckScroll);
                window.removeEventListener('resize', debouncedCheckScroll);
                observer.disconnect();
            };
        }
    }, [availableCategories, checkScroll]);
    
    const scroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.8;
            el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };
    
    if (availableCategories.length === 0) {
        return null;
    }
    
    return (
        <div className="relative">
            <AnimatePresence>
            {showLeftArrow && (
                 <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full px-1 bg-gradient-to-r from-gray-950/80 to-transparent"
                 >
                    <ChevronLeftIcon className="w-5 h-5 text-white bg-black/30 rounded-full" />
                 </motion.button>
            )}
            </AnimatePresence>
            <div 
                ref={scrollContainerRef}
                className="flex gap-2 py-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
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
                            className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-all duration-200 border flex-shrink-0 ${isSelected ? style.tag : unselectedClasses }`}
                        >
                            {category}
                        </motion.button>
                    );
                })}
                </AnimatePresence>
            </div>
             <AnimatePresence>
            {showRightArrow && (
                 <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full px-1 bg-gradient-to-l from-gray-950/80 to-transparent"
                 >
                    <ChevronRightIcon className="w-5 h-5 text-white bg-black/30 rounded-full" />
                 </motion.button>
            )}
            </AnimatePresence>
        </div>
    );
};
