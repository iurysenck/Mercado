import React, { useMemo } from 'react';
import { AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { GroceryItemCard } from './GroceryItemCard';
import { EmptyState } from './EmptyState';
import { DragHandleIcon } from './IconComponents';

interface GroceryListProps {
    items: GroceryItem[];
    onToggleChecked: (id: string, forceState?: boolean) => void;
    onEditItem: (item: GroceryItem) => void;
    onReorderItems: (reorderedItems: GroceryItem[]) => void;
    showNoResultsMessage?: boolean;
}

interface GroupedItems {
    items: GroceryItem[];
    subtotal: number;
}

// Internal component to correctly handle drag controls hook
const DraggableGroceryItem: React.FC<{
    item: GroceryItem;
    onToggleChecked: (id: string, forceState?: boolean) => void;
    onEdit: (item: GroceryItem) => void;
}> = ({ item, onToggleChecked, onEdit }) => {
    const dragControls = useDragControls();
    return (
        <Reorder.Item
            value={item}
            dragListener={false}
            dragControls={dragControls}
        >
            <GroceryItemCard
                item={item}
                onToggleChecked={onToggleChecked}
                onEdit={onEdit}
                dragControls={dragControls}
            />
        </Reorder.Item>
    );
};


export const GroceryList: React.FC<GroceryListProps> = ({ items, onToggleChecked, onEditItem, onReorderItems, showNoResultsMessage }) => {

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const orderedCategories = useMemo(() => {
        const order: Category[] = [];
        const seen = new Set<Category>();
        items.forEach(item => {
            const cat = item.category || Category.OUTROS;
            if (!seen.has(cat)) {
                seen.add(cat);
                order.push(cat);
            }
        });
        return order;
    }, [items]);

    const groupedItems = useMemo(() => {
        return items.reduce((acc, item) => {
            const category : Category = item.category || Category.OUTROS;
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
    
    const handleCategoryReorder = (newCategoryOrder: Category[]) => {
        const itemMap = new Map(items.map(item => [item.id, item]));
        const newItems = newCategoryOrder.flatMap(category => 
            items.filter(item => (item.category || Category.OUTROS) === category)
        );

        const finalItems = Array.from(new Map(newItems.map(item => [item.id, item])).values());
        onReorderItems(finalItems);
    };

    const handleItemReorder = (reorderedItemsForCategory: GroceryItem[]) => {
         const reorderedIds = new Set(reorderedItemsForCategory.map(i => i.id));
         const otherItems = items.filter(i => !reorderedIds.has(i.id));
         const newFullList = [...otherItems, ...reorderedItemsForCategory];
        
         // This is tricky; we need to maintain overall order of other categories
         const finalItems = items.map(it => {
            const reorderedVersion = reorderedItemsForCategory.find(ri => ri.id === it.id);
            return reorderedVersion || it;
         });
         
         const newOrderMap = new Map(reorderedItemsForCategory.map((item, index) => [item.id, index]));
         const finalFinalItems = [...items].sort((a,b) => {
            const aIsReordered = newOrderMap.has(a.id);
            const bIsReordered = newOrderMap.has(b.id);
            if(aIsReordered && bIsReordered) {
                return (newOrderMap.get(a.id) ?? 0) - (newOrderMap.get(b.id) ?? 0);
            }
            return 0;
         })

         onReorderItems(finalFinalItems);
    };


    return (
        <div className="flow-root">
            <Reorder.Group axis="y" values={orderedCategories} onReorder={handleCategoryReorder}>
                <AnimatePresence>
                    {orderedCategories.map(category => (
                        <Reorder.Item
                            key={category}
                            value={category}
                            className="mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="flex justify-between items-center px-1 mb-3">
                                <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing">
                                    <DragHandleIcon className="w-4 h-4 text-gray-500" />
                                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{category}</h2>
                                </div>
                                <span className="text-xs font-medium text-gray-500 tabular-nums">{formatCurrency(groupedItems[category].subtotal)}</span>
                            </div>
                            <Reorder.Group
                                axis="y"
                                values={groupedItems[category].items}
                                onReorder={handleItemReorder}
                                className="space-y-3"
                            >
                               <AnimatePresence>
                                {groupedItems[category].items.map(item => (
                                    <DraggableGroceryItem
                                        key={item.id}
                                        item={item}
                                        onToggleChecked={onToggleChecked}
                                        onEdit={onEditItem}
                                    />
                                ))}
                               </AnimatePresence>
                            </Reorder.Group>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        </div>
    );
};