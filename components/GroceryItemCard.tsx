import React from 'react';
import { motion, PanInfo, useMotionValue, useTransform, animate, DragControls } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { CategoryTag } from './CategoryTag';
import { useHaptics } from '../hooks/useHaptics';
import { CheckCircleIcon, ArrowLeftCircleIcon, DragHandleIcon } from './IconComponents';
import { CATEGORY_CARD_CLASSES } from '../constants';

interface GroceryItemCardProps {
    item: GroceryItem;
    onToggleChecked: (id: string, forceState?: boolean) => void;
    onEdit: (item: GroceryItem) => void;
    dragControls: DragControls;
}

const SWIPE_THRESHOLD = 80;

export const GroceryItemCard: React.FC<GroceryItemCardProps> = ({ item, onToggleChecked, onEdit, dragControls }) => {
    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    const { triggerHapticFeedback } = useHaptics();
    
    const x = useMotionValue(0);
    
    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > SWIPE_THRESHOLD) {
            triggerHapticFeedback('light');
            onToggleChecked(item.id, true);
        } else if (info.offset.x < -SWIPE_THRESHOLD) {
            triggerHapticFeedback('light');
            onToggleChecked(item.id, false);
        }
        animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
    };
    
    const checkOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
    const uncheckOpacity = useTransform(x, [0, -SWIPE_THRESHOLD], [0, 1]);

    const categoryClass = item.category ? CATEGORY_CARD_CLASSES[item.category] : CATEGORY_CARD_CLASSES[Category.OUTROS];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="relative"
        >
             <motion.div
                className="absolute inset-0 rounded-xl flex items-center justify-between px-4 pointer-events-none"
            >
                <motion.div style={{ opacity: checkOpacity }} className="text-green-400">
                    <CheckCircleIcon className="w-6 h-6" />
                </motion.div>
                <motion.div style={{ opacity: uncheckOpacity }} className="text-yellow-400">
                    <ArrowLeftCircleIcon className="w-6 h-6" />
                </motion.div>
            </motion.div>

            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                style={{ x }}
                onDragEnd={onDragEnd}
                onTap={() => onEdit(item)}
                className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-3 transition-all duration-300 w-full cursor-pointer ${item.checked ? 'opacity-40' : 'opacity-100'} border-l-4 ${categoryClass}`}
            >
                <div className="flex items-center gap-3">
                    <div 
                        onPointerDown={(e) => dragControls.start(e)}
                        className="cursor-grab active:cursor-grabbing p-2 -ml-2 text-gray-500 hover:text-white"
                    >
                       <DragHandleIcon className="w-5 h-5"/>
                    </div>
                    <div className="flex-grow">
                        <p className={`font-semibold text-white ${item.checked ? 'line-through' : ''}`}>
                            {item.name || <span className="text-gray-500">Novo Item...</span>}
                        </p>
                        <p className="text-sm text-gray-400">
                            {item.quantity} x {formatCurrency(item.unitPrice)}
                        </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="font-bold text-white tabular-nums">{formatCurrency(item.quantity * item.unitPrice)}</p>
                        {item.category && (
                            <div className="mt-1 flex justify-end">
                                <CategoryTag category={item.category} />
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};