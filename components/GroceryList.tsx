



import React, { useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { GroceryItemCard } from './GroceryItemCard';
import { EmptyState } from './EmptyState';
import { UNCATEGORIZED } from '../constants';

interface GroceryListProps {
    items: GroceryItem[];
    onToggleChecked: (id: string, forceState?: boolean) => void;
    onEditItem: (item: GroceryItem) => void;
    onDeleteItem: (id: string) => void;
    showNoResultsMessage?: boolean;
    isSelectionMode: boolean;
    selectedItemIds: Set<string>;
    onToggleItemSelection: (id: string) => void;
    activeFilters: Category[];
    orderedCategories: Category[];
    onVisibleCategoryChange: (category: Category | null) => void;
}

interface GroupedItems {
    items: GroceryItem[];
    subtotal: number;
}


export const GroceryList: React.FC<GroceryListProps> = ({ 
    items, onToggleChecked, onEditItem, onDeleteItem, showNoResultsMessage,
    isSelectionMode, selectedItemIds, onToggleItemSelection, activeFilters,
    orderedCategories, onVisibleCategoryChange
}) => {
    const categoryRefs = useRef(new Map<Category, HTMLElement>());

    useEffect(() => {
        const rootMarginTop = -50;
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const category = entry.target.getAttribute('data-category') as Category;
                    onVisibleCategoryChange(category);
                    // Once we find the first intersecting element from the top, we can stop.
                    // This makes the top-most visible category the active one.
                    return; 
                }
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: `${rootMarginTop}px 0px -65% 0px`,
            threshold: 0,
        });

        const refs = categoryRefs.current;
        refs.forEach(node => {
            if (node) observer.observe(node);
        });

        return () => {
             refs.forEach(node => {
                if (node) observer.unobserve(node);
            });
        };
    }, [orderedCategories, onVisibleCategoryChange]);


    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const groupedItems = useMemo(() => {
        return items.reduce((acc, item) => {
            const category : Category = item.category || UNCATEGORIZED;
            if (!acc[category]) {
                acc[category] = { items: [], subtotal: 0 };
            }
            acc[category].items.push(item);
            acc[category].subtotal += item.quantity * item.unitPrice;
            return acc;
        }, {} as Record<string, GroupedItems>);
    }, [items]);

    if (items.length === 0) {
        return <EmptyState isSearchResult={showNoResultsMessage} />;
    }

    return (
        <div className="flow-root">
             <div>
                <AnimatePresence>
                    {orderedCategories.map(category => (
                        <motion.div
                            key={category}
                            layout
                            className="mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div 
                                id={`category-header-${category}`} 
                                ref={node => {
                                    if (node) categoryRefs.current.set(category, node);
                                    else categoryRefs.current.delete(category);
                                }}
                                data-category={category}
                                className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-md flex justify-between items-center px-2 mb-3 -mx-2 py-2"
                            >
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{category}</h2>
                                </div>
                                <span className="text-xs font-medium text-gray-400 tabular-nums">{groupedItems[category] ? formatCurrency(groupedItems[category].subtotal) : formatCurrency(0)}</span>
                            </div>
                            <div className="space-y-3">
                               <AnimatePresence>
                                {groupedItems[category] && groupedItems[category].items.map(item => (
                                    <GroceryItemCard
                                        key={item.id}
                                        item={item}
                                        onToggleChecked={onToggleChecked}
                                        onEdit={onEditItem}
                                        onDelete={onDeleteItem}
                                        isSelectionMode={isSelectionMode}
                                        isSelected={selectedItemIds.has(item.id)}
                                        onToggleSelection={onToggleItemSelection}
                                        activeFilters={activeFilters}
                                    />
                                ))}
                               </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};