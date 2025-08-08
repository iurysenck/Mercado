
import React, { useRef } from 'react';
import { motion, useMotionValue, PanInfo, animate } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { CategoryTag } from './CategoryTag';
import { getCategoryStyle } from '../constants';
import { TrashIcon } from './IconComponents';


interface GroceryItemCardProps {
    item: GroceryItem;
    onToggleChecked: (id: string, forceState?: boolean) => void;
    onEdit: (item: GroceryItem) => void;
    onDelete: (id: string) => void;
    isSelectionMode: boolean;
    isSelected: boolean;
    onToggleSelection: (id: string) => void;
    activeFilters: Category[];
}

export const GroceryItemCard: React.FC<GroceryItemCardProps> = ({ 
    item, onToggleChecked, onEdit, onDelete, isSelectionMode, isSelected, onToggleSelection, activeFilters
}) => {
    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const { card: categoryClass } = getCategoryStyle(item.category);
    
    const isDragging = useRef(false);
    const x = useMotionValue(0);
    
    const ACTION_WIDTH = 80; // Width of the delete action in pixels

    const resetCardPosition = () => {
         animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }

    const handleCardClick = () => {
        if (isDragging.current) return;
        // If the card is swiped, clicking it should reset its position
        if (x.get() !== 0) {
            resetCardPosition();
            return;
        }
        if (isSelectionMode) {
            onToggleSelection(item.id);
        } else {
            onEdit(item);
        }
    };
    
    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
         if (x.get() !== 0) {
            resetCardPosition();
            return;
        }
        if (!isSelectionMode) {
            onToggleChecked(item.id);
        }
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(item.id);
    };
    
    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // Use a short timeout to prevent the click event from firing immediately after drag
        setTimeout(() => { isDragging.current = false }, 100);

        const { offset, velocity } = info;
        
        // Allow only left swipe to reveal action
        if (offset.x < 0) {
            // If swiped left with some velocity or dragged past half the action width
            if (offset.x < -ACTION_WIDTH / 2 || velocity.x < -300) {
                // Animate to revealed state
                animate(x, -ACTION_WIDTH, { type: "spring", stiffness: 300, damping: 30 });
            } else {
                // Animate back to origin
                resetCardPosition();
            }
        } else {
            // No right swipe action, so snap back
            resetCardPosition();
        }
    };

    const showCategoryTag = activeFilters.length > 0 && item.category && activeFilters.includes(item.category);

    return (
        <div className="relative rounded-xl overflow-hidden">
            <motion.div
                layout
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -ACTION_WIDTH, right: 0 }}
                dragElastic={{ left: 0.2, right: 0 }}
                onDragStart={() => isDragging.current = true}
                onDragEnd={onDragEnd}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: "-100%", transition: { duration: 0.25 } }}
                className={`
                    relative flex cursor-pointer
                    border rounded-xl shadow-lg border-l-[6px]
                    ${item.checked 
                        ? 'bg-gray-950/90 backdrop-blur-md border-gray-800 border-l-gray-600' 
                        : `bg-gray-900/70 backdrop-blur-md border-white/10 ${categoryClass}`
                    }
                    ${isSelectionMode && isSelected ? 'ring-2 ring-blue-500' : ''}
                `}
            >
                <div
                    className="w-full flex-shrink-0"
                    onClick={handleCardClick}
                >
                    <div className="flex items-center gap-3 p-2 sm:p-3">
                        <div
                            className="p-2 -m-2 flex-shrink-0" // Increased tap area
                            onClick={handleCheckboxClick}
                        >
                            <input
                                type="checkbox"
                                checked={isSelectionMode ? isSelected : item.checked}
                                readOnly
                                className="h-5 w-5 rounded-full border-2 border-gray-600 bg-gray-800/80 text-blue-500 focus:ring-2 focus:ring-blue-600 checked:bg-blue-500 checked:border-blue-500 transition-all duration-200 cursor-pointer flex-shrink-0 appearance-none"
                                style={{ minWidth: '1.25rem' }}
                            />
                        </div>
                        <div className="flex-grow flex items-center justify-between gap-3">
                            <div>
                                <p className={`font-medium text-sm sm:text-base ${item.checked ? 'line-through text-gray-400' : 'text-white'}`}>
                                    {item.name || <span className="text-gray-500">Novo Item...</span>}
                                </p>
                                <p className={`text-xs sm:text-sm ${item.checked ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {item.quantity} x {formatCurrency(item.unitPrice)}
                                </p>
                            </div>
                            <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                                <p className={`font-bold tabular-nums text-sm sm:text-base ${item.checked ? 'text-gray-500' : 'text-white'}`}>{formatCurrency(item.quantity * item.unitPrice)}</p>
                                <div className="h-6 flex items-center gap-2">
                                    {showCategoryTag && item.category && <CategoryTag category={item.category} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-20 flex-shrink-0">
                    <button 
                        onClick={handleDeleteClick} 
                        className="h-full w-full flex flex-col items-center justify-center text-red-400 hover:text-red-300 transition-colors focus:outline-none"
                        tabIndex={-1}
                    >
                        <TrashIcon className="w-6 h-6" />
                        <span className="text-xs font-semibold mt-1">Apagar</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
