


import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GroceryItem, Category, GroceryListInfo, FunnyMessage } from './types';
import { FUNNY_MESSAGES, UNCATEGORIZED, FUNNY_LIST_NAMES, PREDEFINED_CATEGORIES, VISITED_LISTS_KEY } from './constants';
import { useHistoryState } from './hooks/useHistoryState';
import { useModal } from './hooks/useModal';

import { ActionBar } from './components/ActionBar';
import { GroceryList } from './components/GroceryList';
import { EditItemModal } from './components/EditItemModal';
import { ImportModal } from './components/ImportModal';
import { Toast } from './components/Toast';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ListManagerModal } from './components/ListManagerModal';
import { CategoryFilter } from './components/CategoryFilter';
import { ShareModal } from './components/ShareModal';
import { Fireworks } from './components/Fireworks';
import { FunnyMessageDisplay } from './components/FunnyMessageDisplay';
import { SelectionToolbar } from './components/SelectionToolbar';
import { CategoryNavigator } from './components/CategoryNavigator';
import { GroceryListSkeleton } from './components/GroceryListSkeleton';
import { TotalFooter } from './components/TotalFooter';

const App: React.FC = () => {
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [activeListInfo, setActiveListInfo] = useState<GroceryListInfo | null>(null);
  const [visitedLists, setVisitedLists] = useState<GroceryListInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { 
    state: items, 
    setState, 
    resetHistory,
    undo, 
    redo, 
    canUndo, 
    canRedo,
  } = useHistoryState<GroceryItem[]>([], activeListId || 'noop');
  
  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [isListManagerOpen, setListManagerOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number, message: string, showUndo?: boolean } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isCelebration, setCelebration] = useState(false);
  const [funnyMessage, setFunnyMessage] = useState<FunnyMessage | null>(null);

  const [isSelectionMode, setSelectionMode] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
  const [visibleCategory, setVisibleCategory] = useState<Category | null>(null);
  const [colorUpdateKey, setColorUpdateKey] = useState(0);
  
  const lastPriceTier = useRef(0);
  const { showConfirmation } = useModal();

  // Force re-render on category color change
  useEffect(() => {
    const forceRerender = () => setColorUpdateKey(k => k + 1);
    window.addEventListener('category-color-update', forceRerender);
    return () => window.removeEventListener('category-color-update', forceRerender);
  }, []);

  // Step 1: Load visited lists from local storage once on app start.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(VISITED_LISTS_KEY);
      setVisitedLists(stored ? JSON.parse(stored) : []);
    } catch (e) { 
        console.error("Failed to load visited lists", e); 
        setVisitedLists([]);
    }
  }, []);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 250);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const updateVisitedLists = useCallback((listInfo: GroceryListInfo) => {
    setVisitedLists(prev => {
      const newLists = [listInfo, ...(prev || []).filter(l => l.id !== listInfo.id)];
      try {
        window.localStorage.setItem(VISITED_LISTS_KEY, JSON.stringify(newLists));
      } catch (e) {
        console.error("Failed to save visited lists", e);
      }
      return newLists;
    });
  }, []);

  const showToast = useCallback((message: string, options?: { showUndo?: boolean }) => {
    const canShowUndo = options?.showUndo;
    setToast({ id: Date.now(), message, showUndo: canShowUndo });
  }, []);

  const handleToastDismiss = useCallback(() => {
    setToast(null);
  }, []);

  const handleUndo = useCallback(() => {
    undo();
    setToast(null);
  }, [undo]);

  const handleCreateList = useCallback((name: string) => {
    const newListId = crypto.randomUUID();
    const newListInfo: GroceryListInfo = {
        id: newListId,
        name,
        createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem(`list-history-${newListId}`, JSON.stringify([[]]));
    updateVisitedLists(newListInfo);
    setListManagerOpen(false);
    window.location.hash = `#/list/${newListId}`;
  }, [updateVisitedLists]);
  
  // Step 2: Handle routing after lists are loaded.
  useEffect(() => {
    if (visitedLists === null) return;

    const handleHashChange = () => {
        const hash = window.location.hash;
        const match = hash.match(/#\/list\/(.*)/);
        if (match && match[1]) {
            setActiveListId(match[1]);
        } else {
            if (visitedLists.length > 0) {
                window.location.hash = `#/list/${visitedLists[0].id}`;
            } else {
                // First time launch: create a new list.
                const randomName = FUNNY_LIST_NAMES[Math.floor(Math.random() * FUNNY_LIST_NAMES.length)];
                const newListId = crypto.randomUUID();
                const newListInfo: GroceryListInfo = {
                    id: newListId,
                    name: randomName,
                    createdAt: new Date().toISOString(),
                };
                
                // For first launch, create an empty list.
                const firstLaunchHistory = [[]];
                window.localStorage.setItem(`list-history-${newListId}`, JSON.stringify(firstLaunchHistory));

                updateVisitedLists(newListInfo);
                window.location.hash = `#/list/${newListId}`;
            }
        }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Trigger initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [visitedLists, updateVisitedLists]);

  // Step 3: Load list data when the active list ID changes.
  useEffect(() => {
    if (!activeListId || visitedLists === null) {
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    const listInfo = visitedLists.find(l => l.id === activeListId);

    if (!listInfo) {
        // Invalid list ID. Redirect.
        if (visitedLists.length > 0) {
            window.location.hash = `#/list/${visitedLists[0].id}`;
        } else {
            // This should be handled by the hashchange listener, which creates a new list.
            // But as a fallback, go to home to trigger that logic.
            window.location.hash = '';
        }
        setIsLoading(false);
        return;
    }
    
    setActiveListInfo(listInfo);
    // Since all lists are local, we just need to set loading to false.
    // useHistoryState handles fetching from localStorage based on activeListId.
    setIsLoading(false);
    
  }, [activeListId, visitedLists]);
  
  useEffect(() => {
    const allChecked = items.length > 0 && !isLoading && items.every(item => item.checked);
    setCelebration(allChecked);
  }, [items, isLoading]);

  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), [items]);
  
  useEffect(() => {
    lastPriceTier.current = 0;
  }, [activeListId]);

  useEffect(() => {
    if (funnyMessage) {
      const timer = setTimeout(() => {
        setFunnyMessage(null);
      }, 15000); 

      return () => clearTimeout(timer);
    }
  }, [funnyMessage]);

  useEffect(() => {
    const baseThreshold = 300;
    const increment = 100;

    if (funnyMessage || totalPrice < baseThreshold) {
      return;
    }

    const nextThreshold = lastPriceTier.current === 0
      ? baseThreshold
      : lastPriceTier.current + increment;

    if (totalPrice >= nextThreshold) {
      const randomIndex = Math.floor(Math.random() * FUNNY_MESSAGES.length);
      setFunnyMessage(FUNNY_MESSAGES[randomIndex]);
      const currentTier = Math.floor((totalPrice - baseThreshold) / increment) * increment + baseThreshold;
      lastPriceTier.current = currentTier;
    }
  }, [totalPrice, funnyMessage]);

  const handleSaveItem = useCallback((itemToSave: GroceryItem) => {
     setState(prevItems => {
        const isUpdating = prevItems.some(i => i.id === itemToSave.id);
        const processedItem = {...itemToSave, category: itemToSave.category?.trim().toUpperCase() || null };
        if (isUpdating) {
            return prevItems.map(i => i.id === itemToSave.id ? processedItem : i);
        } else {
            const newItem = {...processedItem, id: crypto.randomUUID() };
            return [...prevItems, newItem];
        }
    });
    showToast('Item salvo.', { showUndo: true });
    setEditingItem(null);
  }, [setState, showToast]);

  const handleAddItem = useCallback(() => {
    const newItem: GroceryItem = {
        id: `new-${crypto.randomUUID()}`,
        name: '',
        checked: false,
        quantity: 1,
        unitPrice: 0,
        category: null,
    };
    setEditingItem(newItem);
  }, []);

  const handleToggleChecked = useCallback((id: string, forceState?: boolean) => {
    setState(prevItems => prevItems.map(item =>
        item.id === id ? { ...item, checked: forceState ?? !item.checked } : item
    ));
  }, [setState]);

  const handleDeleteItem = useCallback((id: string) => {
    setState(prevItems => prevItems.filter(item => item.id !== id));
    showToast('Item excluído.', { showUndo: true });
    setEditingItem(null);
  }, [setState, showToast]);

  const handleRenameList = useCallback((newName: string) => {
    if (!activeListId || !activeListInfo) return;
    const updatedInfo = { ...activeListInfo, name: newName };
    updateVisitedLists(updatedInfo);
    setActiveListInfo(updatedInfo);
  }, [activeListId, activeListInfo, updateVisitedLists]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
        const searchMatch = debouncedSearchQuery ? item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) : true;
        const categoryMatch = selectedCategories.length > 0 ? item.category && selectedCategories.includes(item.category) : true;
        return searchMatch && categoryMatch;
    });
  }, [items, debouncedSearchQuery, selectedCategories]);

  const availableCategories = useMemo(() => {
    const categories = new Set(items.map(item => item.category).filter((c): c is Category => c !== null));
    return Array.from(categories).sort((a,b) => a.localeCompare(b));
  }, [items]);

  const orderedCategories = useMemo(() => {
    const categoriesInList = new Set(filteredItems.map(item => item.category || UNCATEGORIZED));
    return Array.from(categoriesInList).sort((a, b) => {
        if (a === UNCATEGORIZED) return 1;
        if (b === UNCATEGORIZED) return -1;
        return a.localeCompare(b);
    });
  }, [filteredItems]);

  const handleToggleItemSelection = useCallback((id: string) => {
    setSelectedItemIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        if (newSet.size === 0) {
            setSelectionMode(false);
        }
        return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedItemIds.size === filteredItems.length) {
        setSelectedItemIds(new Set());
        setSelectionMode(false);
    } else {
        setSelectedItemIds(new Set(filteredItems.map(item => item.id)));
    }
  }, [selectedItemIds.size, filteredItems]);

  const handleBatchUpdate = useCallback((updateFn: (item: GroceryItem) => Partial<GroceryItem>, successMessage: string) => {
    const idsToUpdate = Array.from(selectedItemIds);
    if (idsToUpdate.length === 0) return;

    setState(prev => prev.map(item => {
        if (idsToUpdate.includes(item.id)) {
            return { ...item, ...updateFn(item) };
        }
        return item;
    }));
    showToast(successMessage, { showUndo: true });

    setSelectionMode(false);
    setSelectedItemIds(new Set());
  }, [selectedItemIds, setState, showToast]);
    
  const handleBatchDelete = useCallback(() => {
    const idsToDelete = Array.from(selectedItemIds);
    if (idsToDelete.length === 0) return;

    setState(prev => prev.filter(item => !idsToDelete.includes(item.id)));
    showToast(`${idsToDelete.length} itens excluídos.`, { showUndo: true });
    
    setSelectionMode(false);
    setSelectedItemIds(new Set());
  }, [selectedItemIds, setState, showToast]);

  const handleBatchCheck = useCallback((checkState: boolean) => {
    handleBatchUpdate(() => ({ checked: checkState }), `Itens marcados como ${checkState ? 'comprados' : 'pendentes'}.`);
  }, [handleBatchUpdate]);

  const handleBatchZeroPrice = useCallback(() => {
    handleBatchUpdate(() => ({ unitPrice: 0 }), 'Preço zerado para os itens selecionados.');
  }, [handleBatchUpdate]);
  
  const handleCategoryFilterToggle = useCallback((category: Category) => {
    setSelectedCategories(prev => {
        const newSet = new Set(prev);
        if (newSet.has(category)) {
            newSet.delete(category);
        } else {
            newSet.add(category);
        }
        return Array.from(newSet);
    });
  }, []);

  const handleCategoryNavClick = (category: Category) => {
    const element = document.getElementById(`category-header-${category}`);
    if (element) {
        // We need to account for the sticky header height
        const headerOffset = 60; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
        });
    }
  };
    
  const handleImportItems = useCallback((newItems: GroceryItem[]) => {
    setState(prev => [...prev, ...newItems]);
    showToast(`${newItems.length} itens importados.`, { showUndo: true });
    setImportModalOpen(false);
  }, [setState, showToast]);

  const handleDeleteList = useCallback(async (id: string) => {
    const confirmed = await showConfirmation({
        title: "Excluir Lista",
        message: "Tem certeza que deseja excluir esta lista? Esta ação não pode ser desfeita.",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        variant: 'danger'
    });
    if (!confirmed) {
        return;
    }

    // Manually calculate the next state to avoid using stale state from closure
    const newVisitedLists = (visitedLists || []).filter(l => l.id !== id);
    setVisitedLists(newVisitedLists);
    try {
        window.localStorage.setItem(VISITED_LISTS_KEY, JSON.stringify(newVisitedLists));
        window.localStorage.removeItem(`list-history-${id}`);
    } catch (e) {
        console.error("Failed to update lists in storage", e);
    }

    if (id === activeListId) {
        if (newVisitedLists.length > 0) {
            // Navigate to the next available list
            window.location.hash = `#/list/${newVisitedLists[0].id}`;
        } else {
            // No lists left, create a new one
            const randomName = FUNNY_LIST_NAMES[Math.floor(Math.random() * FUNNY_LIST_NAMES.length)];
            handleCreateList(randomName);
        }
    }
    // If a non-active list was deleted from the manager, it will just re-render.
    // If the active list was deleted, navigation will occur and the manager will close.
    setListManagerOpen(false);

  }, [visitedLists, activeListId, showConfirmation, handleCreateList]);
    
  const handleRenameManagedList = useCallback((id: string, newName:string) => {
    setVisitedLists(prev => {
        const newLists = (prev || []).map(l => l.id === id ? {...l, name: newName} : l);
        window.localStorage.setItem(VISITED_LISTS_KEY, JSON.stringify(newLists));
        
        if (id === activeListId) {
            handleRenameList(newName);
        }

        return newLists;
    })
  }, [activeListId, handleRenameList]);

  const handleClearData = useCallback(() => {
    try {
        window.localStorage.clear();

        const randomName = FUNNY_LIST_NAMES[Math.floor(Math.random() * FUNNY_LIST_NAMES.length)];
        const newListId = crypto.randomUUID();
        const newListInfo: GroceryListInfo = {
            id: newListId,
            name: randomName,
            createdAt: new Date().toISOString(),
        };
        
        window.localStorage.setItem(`list-history-${newListId}`, JSON.stringify([[]]));
        window.localStorage.setItem(VISITED_LISTS_KEY, JSON.stringify([newListInfo]));

        // Manually reset React state instead of reloading
        resetHistory([]);
        setVisitedLists([newListInfo]);
        setListManagerOpen(false);
        window.location.hash = `#/list/${newListId}`;
        
    } catch (e) {
        console.error("Failed to clear and restart app:", e);
        showConfirmation({
            title: 'Erro',
            message: "Não foi possível limpar os dados. Por favor, tente limpar os dados do seu navegador manualmente.",
            confirmText: 'OK',
            cancelText: null,
            variant: 'danger'
        });
    }
  }, [resetHistory, showConfirmation]);

  return (
    <InteractiveBackground mood={isCelebration ? 'celebration' : 'default'}>
        <div className="flex flex-col min-h-screen">
            <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col">
                <ActionBar
                    listName={activeListInfo?.name || 'Carregando...'}
                    onOpenImport={() => setImportModalOpen(true)}
                    onOpenShare={() => setShareModalOpen(true)}
                    onOpenListManager={() => setListManagerOpen(true)}
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    onRenameList={handleRenameList}
                    isSelectionMode={isSelectionMode}
                    onUndo={handleUndo}
                    onRedo={redo}
                    canUndo={canUndo}
                    canRedo={canRedo}
                />
                <main className="px-4 pb-32 flex-grow">
                    <CategoryFilter 
                        availableCategories={availableCategories}
                        selectedCategories={selectedCategories}
                        onToggleCategory={handleCategoryFilterToggle}
                    />
                    {isLoading ? (
                        <GroceryListSkeleton />
                    ) : (
                        <GroceryList
                            items={filteredItems}
                            onToggleChecked={handleToggleChecked}
                            onEditItem={setEditingItem}
                            onDeleteItem={handleDeleteItem}
                            showNoResultsMessage={debouncedSearchQuery.length > 0 || selectedCategories.length > 0}
                            isSelectionMode={isSelectionMode}
                            selectedItemIds={selectedItemIds}
                            onToggleItemSelection={handleToggleItemSelection}
                            activeFilters={selectedCategories}
                            orderedCategories={orderedCategories}
                            onVisibleCategoryChange={setVisibleCategory}
                        />
                    )}
                </main>
            </div>
        </div>
        
        <FunnyMessageDisplay funnyMessage={funnyMessage} onClose={() => setFunnyMessage(null)} />
        <CategoryNavigator categories={orderedCategories} activeCategory={visibleCategory} onCategoryClick={handleCategoryNavClick} />

        <AnimatePresence>
            {isCelebration && <Fireworks />}
            {toast && (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    onDismiss={handleToastDismiss}
                    isFunnyMessageVisible={!!funnyMessage}
                    onUndo={handleUndo}
                    canUndo={toast.showUndo && canUndo}
                />
            )}
            {editingItem && (
                <EditItemModal
                    item={editingItem}
                    onClose={() => setEditingItem(null)}
                    onSave={handleSaveItem}
                    onDelete={handleDeleteItem}
                    availableCategories={[...new Set([...PREDEFINED_CATEGORIES, ...availableCategories])]}
                />
            )}
            {isImportModalOpen && (
                <ImportModal
                    onClose={() => setImportModalOpen(false)}
                    onImport={handleImportItems}
                />
            )}
             {isListManagerOpen && visitedLists && (
                <ListManagerModal
                    onClose={() => setListManagerOpen(false)}
                    lists={visitedLists}
                    activeListId={activeListId}
                    onSelectList={(id) => {
                        window.location.hash = `#/list/${id}`;
                        setListManagerOpen(false);
                    }}
                    onCreateList={handleCreateList}
                    onRenameList={handleRenameManagedList}
                    onDeleteList={handleDeleteList}
                    onClearData={handleClearData}
                />
            )}
            {isShareModalOpen && activeListInfo && (
                <ShareModal
                    onClose={() => setShareModalOpen(false)}
                    listInfo={activeListInfo}
                    items={items}
                />
            )}
        </AnimatePresence>
        <AnimatePresence>
          {isSelectionMode ? (
              <SelectionToolbar 
                  key="selection-toolbar"
                  selectedCount={selectedItemIds.size}
                  totalCount={filteredItems.length}
                  onClose={() => {
                      setSelectionMode(false);
                      setSelectedItemIds(new Set());
                  }}
                  onDelete={handleBatchDelete}
                  onCheck={handleBatchCheck}
                  onZeroPrice={handleBatchZeroPrice}
                  onSelectAll={handleSelectAll}
              />
          ) : (
              !isLoading && (
                <TotalFooter 
                    key="total-footer" 
                    totalPrice={totalPrice} 
                    itemCount={items.length}
                    onAddItem={handleAddItem}
                    onEnterSelectionMode={() => setSelectionMode(true)}
                />
              )
          )}
        </AnimatePresence>
    </InteractiveBackground>
  );
};

export default App;