
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { CategoryTag } from './CategoryTag';
import { getCategoryStyle, UNCATEGORIZED } from '../constants';
import { TrashIcon, CheckIcon } from './IconComponents';


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

    const handleCardClick = () => {
        if (isDragging.current) return;
        if (isSelectionMode) {
            onToggleSelection(item.id);
        } else {
            onEdit(item);
        }
    };
    
    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isSelectionMode) {
            onToggleChecked(item.id);
        }
    };
    
    const x = useMotionValue(0);
    const swipeThreshold = 60;
    const greenOpacity = useTransform(x, [0, swipeThreshold], [0, 1]);
    const redOpacity = useTransform(x, [0, -swipeThreshold], [0, 1]);

    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setTimeout(() => isDragging.current = false, 100);
        if (info.offset.x > swipeThreshold) {
            onToggleChecked(item.id, true);
        } else if (info.offset.x < -swipeThreshold) {
            onDelete(item.id);
        }
    };

    const showCategoryTag = activeFilters.length > 0 && item.category && activeFilters.includes(item.category);

    return (
        <div className="relative">
            <motion.div 
                className="absolute inset-0 bg-green-500 rounded-xl flex items-center justify-start px-6"
                style={{ opacity: item.checked ? 0 : greenOpacity }}
            >
                <CheckIcon className="w-6 h-6 text-white" />
            </motion.div>
             <motion.div 
                className="absolute inset-0 bg-red-500 rounded-xl flex items-center justify-end px-6"
                style={{ opacity: redOpacity }}
            >
                <TrashIcon className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
                layout
                style={{ x }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => isDragging.current = true}
                onDragEnd={onDragEnd}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className={`relative border rounded-xl shadow-lg transition-all duration-300 w-full cursor-pointer border-l-4
                    ${item.checked 
                        ? 'bg-black/20 border-gray-800 border-l-gray-600' 
                        : `bg-white/5 backdrop-blur-md border-white/10 ${categoryClass}`
                    }
                    ${isSelectionMode && isSelected ? 'ring-2 ring-blue-500' : ''}`}
                onClick={handleCardClick}
            >
                <div className="flex items-center gap-3 p-3">
                    <div
                        className="p-2 -m-2 flex-shrink-0" // Increased tap area
                        onClick={handleCheckboxClick}
                    >
                        <input
                            type="checkbox"
                            checked={isSelectionMode ? isSelected : item.checked}
                            readOnly
                            className="h-5 w-5 rounded-full border-2 border-gray-600 bg-gray-800/80 text-blue-500 focus:ring-blue-600 checked:bg-blue-500 checked:border-blue-500 transition-all duration-200 cursor-pointer flex-shrink-0 appearance-none"
                            style={{ minWidth: '1.25rem' }}
                        />
                    </div>
                    <div className="flex-grow flex items-center justify-between gap-3">
                        <div>
                            <p className={`font-semibold ${item.checked ? 'line-through text-gray-400' : 'text-white'}`}>
                                {item.name || <span className="text-gray-500">Novo Item...</span>}
                            </p>
                            <p className={`text-sm ${item.checked ? 'text-gray-500' : 'text-gray-400'}`}>
                                {item.quantity} x {formatCurrency(item.unitPrice)}
                            </p>
                        </div>
                        <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                            <p className={`font-bold tabular-nums ${item.checked ? 'text-gray-500' : 'text-white'}`}>{formatCurrency(item.quantity * item.unitPrice)}</p>
                            <div className="h-6 flex items-center gap-2">
                                {showCategoryTag && item.category && <CategoryTag category={item.category} />}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};