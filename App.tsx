
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GroceryItem, Category, GroceryListInfo, FunnyMessage } from './types';
import { FUNNY_MESSAGES, UNCATEGORIZED, FUNNY_LIST_NAMES, FIRST_LAUNCH_ITEMS, PREDEFINED_CATEGORIES } from './constants';
import * as Firebase from './services/firebase';
import { useHistoryState } from './hooks/useHistoryState';

import { ActionBar } from './components/ActionBar';
import { GroceryList } from './components/GroceryList';
import { SummaryFooter } from './components/TableFooter';
import { EditItemModal } from './components/EditItemModal';
import { ImportModal } from './components/ImportModal';
import { Toast } from './components/Toast';
import { PlusIcon, ListPlusIcon, CheckBadgeIcon } from './components/IconComponents';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ListManagerModal } from './components/ListManagerModal';
import { CategoryFilter } from './components/CategoryFilter';
import { ShareModal } from './components/ShareModal';
import { Fireworks } from './components/Fireworks';
import { FunnyMessageDisplay } from './components/FunnyMessageDisplay';
import { MenuFAB } from './components/MenuFAB';
import { SelectionToolbar } from './components/SelectionToolbar';
import { CategoryNavigator } from './components/CategoryNavigator';
import { GroceryListSkeleton } from './components/GroceryListSkeleton';

const VISITED_LISTS_KEY = 'grocery-app-visited-lists-v2';

const App: React.FC = () => {
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [activeListInfo, setActiveListInfo] = useState<GroceryListInfo | null>(null);
  const [visitedLists, setVisitedLists] = useState<GroceryListInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { 
    state: items, 
    setState, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    resetHistory
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
  
  const isInitialCloudLoad = useRef(true);
  const isCloudList = useMemo(() => activeListInfo?.source === 'cloud', [activeListInfo]);
  const lastPriceTier = useRef(0);

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

  const removeListFromVisited = useCallback((listId: string) => {
      setVisitedLists(prev => {
          const newLists = (prev || []).filter(l => l.id !== listId);
          try {
            window.localStorage.setItem(VISITED_LISTS_KEY, JSON.stringify(newLists));
          } catch (e) {
            console.error("Failed to save visited lists", e);
          }
          return newLists;
      })
  }, []);
  
  const showToast = useCallback((message: string, options?: { showUndo?: boolean }) => {
    const canShowUndo = options?.showUndo && !isCloudList;
    setToast({ id: Date.now(), message, showUndo: canShowUndo });
  }, [isCloudList]);

  const handleToastDismiss = useCallback(() => {
    setToast(null);
  }, []);

  const handleUndo = useCallback(() => {
    if (!isCloudList) {
      undo();
      setToast(null);
    }
  }, [undo, isCloudList]);
  
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
                const newListId = crypto.randomUUID();
                const randomName = FUNNY_LIST_NAMES[Math.floor(Math.random() * FUNNY_LIST_NAMES.length)];
                const newListInfo: GroceryListInfo = {
                    id: newListId,
                    name: randomName,
                    createdAt: new Date().toISOString(),
                    source: 'local',
                };
                
                // Pre-populate the list with items for the first launch.
                const firstLaunchItemsWithNewIds = FIRST_LAUNCH_ITEMS.map(item => ({
                    ...item,
                    id: crypto.randomUUID(),
                }));
                const firstLaunchHistory = [firstLaunchItemsWithNewIds];
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
    let listInfo = visitedLists.find(l => l.id === activeListId);

    // This handles the race condition on first app launch where activeListId is set
    // but the newly created local list isn't in `visitedLists` state yet.
    // In this case, we just wait for the next render.
    if (!listInfo && visitedLists.length === 0) {
        return; // Keep loading, wait for `visitedLists` to update.
    }

    // This handles opening a shared link for the first time. The list is not in
    // `visitedLists`, so we add it as a 'cloud' list and prepare to fetch.
    if (!listInfo) {
        listInfo = { id: activeListId, name: 'Carregando Lista...', createdAt: new Date().toISOString(), source: 'cloud' };
        updateVisitedLists(listInfo);
    }
    
    setActiveListInfo(listInfo);

    if (listInfo.source === 'local') {
        // useHistoryState hook handles loading from localStorage automatically
        setIsLoading(false);
        return;
    }
    
    // Cloud list logic
    if (listInfo.source === 'cloud') {
        isInitialCloudLoad.current = true;
        
        const db = Firebase.getDb();
        if(!db) {
            setIsLoading(false);
            showToast("Firebase não está configurado.");
            return;
        }

        const listDocRef = Firebase.doc(db, 'lists', activeListId);
        const itemsCollectionRef = Firebase.collection(db, 'lists', activeListId, 'items');

        const unsubscribeList = Firebase.onSnapshot(listDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const cloudListInfo = { id: docSnap.id, source: 'cloud', ...docSnap.data() } as GroceryListInfo;
                setActiveListInfo(cloudListInfo);
                updateVisitedLists(cloudListInfo);
            } else {
                showToast("Lista não encontrada ou foi excluída.");
                removeListFromVisited(activeListId);
                window.location.hash = ''; 
            }
        });

        const unsubscribeItems = Firebase.onSnapshot(itemsCollectionRef, (snapshot) => {
            const itemsData = snapshot.docs.map(docSnap => ({ ...docSnap.data(), id: docSnap.id } as GroceryItem));
            
            if (isInitialCloudLoad.current) {
                resetHistory(itemsData);
                isInitialCloudLoad.current = false;
            } else {
                setState(itemsData, true); 
            }
            setIsLoading(false);
        }, (error) => {
          console.error("Error fetching items:", error);
          showToast("Erro ao carregar itens da lista.");
          setIsLoading(false);
        });

        return () => {
            unsubscribeList();
            unsubscribeItems();
        };
    }
  }, [activeListId, visitedLists, removeListFromVisited, resetHistory, setState, showToast, updateVisitedLists]);
  
  useEffect(() => {
    const allChecked = items.length > 0 && !isLoading && items.every(item => item.checked);
    setCelebration(allChecked);
  }, [items, isLoading]);

  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), [items]);
  
  // Reset price tier tracker when list changes
  useEffect(() => {
    lastPriceTier.current = 0;
  }, [activeListId]);

  // Effect to automatically clear the funny message after a delay
  useEffect(() => {
    if (funnyMessage) {
      const timer = setTimeout(() => {
        setFunnyMessage(null);
      }, 20000); // Message visible for 20 seconds

      return () => clearTimeout(timer);
    }
  }, [funnyMessage]);

  // Effect to trigger a new funny message when the total price crosses a threshold
  useEffect(() => {
    const baseThreshold = 300;
    const increment = 100;

    // Don't show a new message if one is already visible or price is below the initial threshold
    if (funnyMessage || totalPrice < baseThreshold) {
      return;
    }

    // Determine the next price threshold that should trigger a message
    const nextThreshold = lastPriceTier.current === 0
      ? baseThreshold
      : lastPriceTier.current + increment;

    // Check if the current total price has crossed the next threshold
    if (totalPrice >= nextThreshold) {
      const randomIndex = Math.floor(Math.random() * FUNNY_MESSAGES.length);
      setFunnyMessage(FUNNY_MESSAGES[randomIndex]);

      // To handle large jumps in price, calculate the highest threshold crossed
      const currentTier = Math.floor((totalPrice - baseThreshold) / increment) * increment + baseThreshold;
      lastPriceTier.current = currentTier;
    }
  }, [totalPrice, funnyMessage]);

  const handleSaveItem = useCallback(async (itemToSave: GroceryItem) => {
    const { id, ...itemData } = itemToSave;
    if (isCloudList) {
        if (!activeListId) return;
        const db = Firebase.getDb();
        if(!db) return;
        const itemsCollection = Firebase.collection(db, 'lists', activeListId, 'items');
        try {
            if (items.some(i => i.id === id)) {
                await Firebase.updateDoc(Firebase.doc(itemsCollection, id), itemData);
            } else {
                const docRef = await Firebase.addDoc(itemsCollection, itemData);
                // In cloud mode, we don't manipulate local state directly.
                // The onSnapshot listener will receive the update.
            }
            showToast('Item salvo na nuvem.');
        } catch (e) { showToast("Falha ao salvar item na nuvem."); }
    } else {
        const isNew = !items.some(i => i.id === id);
        setState(currentItems => {
            return isNew 
                ? [...currentItems, itemToSave] 
                : currentItems.map(i => i.id === id ? itemToSave : i);
        });
        showToast(isNew ? 'Item adicionado.' : 'Item atualizado.', { showUndo: true });
    }
    setEditingItem(null);
  }, [activeListId, isCloudList, items, setState, showToast]);

  const handleAddItem = useCallback(() => {
    setEditingItem({
      id: `new-${crypto.randomUUID()}`,
      checked: false, name: '', quantity: 1, unitPrice: 0, category: null,
    });
  }, []);
  
  const handleDeleteItem = useCallback(async (id: string) => {
    if (isCloudList) {
        if (!activeListId) return;
        const db = Firebase.getDb();
        if(!db) return;
        try {
            await Firebase.deleteDoc(Firebase.doc(db, 'lists', activeListId, 'items', id));
        } catch (e) { showToast("Falha ao excluir item."); }
    } else {
        setState(current => current.filter(i => i.id !== id));
        showToast('Item excluído.', { showUndo: true });
    }
    setEditingItem(null);
  }, [activeListId, isCloudList, setState, showToast]);

  const handleToggleChecked = useCallback(async (id: string, forceState?: boolean) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const isChecked = typeof forceState === 'boolean' ? forceState : !item.checked;
    
    if (isCloudList) {
        if (!activeListId) return;
        const db = Firebase.getDb();
        if(!db) return;
        try {
            await Firebase.updateDoc(Firebase.doc(db, 'lists', activeListId, 'items', id), { checked: isChecked });
        } catch (e) { showToast("Falha ao atualizar item."); }
    } else {
        setState(current => current.map(i => i.id === id ? { ...i, checked: isChecked } : i));
        const message = isChecked ? 'Item marcado como comprado.' : 'Item movido para a lista.';
        showToast(message, { showUndo: true });
    }
  }, [activeListId, items, isCloudList, setState, showToast]);

  const handleImportList = useCallback(async (importedItems: GroceryItem[]) => {
    if (isCloudList) {
        if (!activeListId) return;
        const db = Firebase.getDb();
        if(!db) return;
        const itemsCollection = Firebase.collection(db, 'lists', activeListId, 'items');
        const batch = Firebase.writeBatch(db);
        importedItems.forEach(item => {
          const { id, ...itemData } = item; // Don't persist temporary ID
          batch.set(Firebase.doc(itemsCollection), itemData)
        });
        try {
            await batch.commit();
            showToast(`${importedItems.length} itens importados.`);
        } catch (e) { showToast("Falha na importação."); }
    } else {
        setState(current => [...current, ...importedItems]);
        showToast(`${importedItems.length} itens importados.`, { showUndo: true });
    }
    setImportModalOpen(false);
  }, [activeListId, isCloudList, setState, showToast]);

  const handleCreateList = (name: string) => {
    const newListId = crypto.randomUUID();
    const newListInfo: GroceryListInfo = {
        id: newListId,
        name,
        createdAt: new Date().toISOString(),
        source: 'local',
    };
    updateVisitedLists(newListInfo);
    window.location.hash = `#/list/${newListId}`;
    setListManagerOpen(false);
  };

  const handleSelectList = (id: string) => {
    window.location.hash = `#/list/${id}`;
    setListManagerOpen(false);
  };

  const handleRenameList = async (id: string, newName: string) => {
    const list = (visitedLists || []).find(l => l.id === id);
    if (!list) return;

    if (list.source === 'cloud') {
        const db = Firebase.getDb();
        if(!db) return;
        try {
            await Firebase.updateDoc(Firebase.doc(db, 'lists', id), { name: newName });
            showToast('Lista renomeada.');
        } catch(e) { showToast("Falha ao renomear lista."); }
    } else {
        const updatedList = { ...list, name: newName };
        updateVisitedLists(updatedList);
        if (activeListId === id) {
          setActiveListInfo(updatedList);
        }
        showToast('Lista renomeada.');
    }
  };
  
  const handleRenameActiveList = (newName: string) => {
    if (activeListId) handleRenameList(activeListId, newName);
  };

  const handleDeleteList = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta lista? Esta ação não pode ser desfeita.")) return;
    const list = (visitedLists || []).find(l => l.id === id);
    if (!list) return;

    if (list.source === 'cloud') {
        const db = Firebase.getDb();
        if(!db) return;
        try {
            const itemsRef = Firebase.collection(db, 'lists', id, 'items');
            const itemsSnap = await Firebase.getDocs(itemsRef);
            const batch = Firebase.writeBatch(db);
            itemsSnap.forEach(docSnap => batch.delete(docSnap.ref));
            await batch.commit();
            await Firebase.deleteDoc(Firebase.doc(db, 'lists', id));
        } catch(e) {
            showToast("Falha ao excluir lista da nuvem.");
            return;
        }
    } else {
        window.localStorage.removeItem(`list-history-${id}`);
    }
    
    removeListFromVisited(id);
    showToast('Lista excluída.');
    if (activeListId === id) window.location.hash = '';
  };

  const handlePublishList = async () => {
    if (!activeListInfo || activeListInfo.source === 'cloud') return;
    const localId = activeListInfo.id;
    
    setIsLoading(true);
    try {
        const db = Firebase.getDb();
        if(!db) {
          setIsLoading(false);
          return;
        }

        const listCollection = Firebase.collection(db, 'lists');
        const newListDoc = await Firebase.addDoc(listCollection, {
            name: activeListInfo.name,
            createdAt: new Date().toISOString(),
        });
        
        const newCloudId = newListDoc.id;
        const itemsCollection = Firebase.collection(db, 'lists', newCloudId, 'items');
        const batch = Firebase.writeBatch(db);
        items.forEach(item => {
            const { id, ...itemData } = item;
            batch.set(Firebase.doc(itemsCollection), itemData);
        });
        await batch.commit();

        const newCloudInfo: GroceryListInfo = { ...activeListInfo, id: newCloudId, source: 'cloud' };

        removeListFromVisited(localId);
        window.localStorage.removeItem(`list-history-${localId}`);
        updateVisitedLists(newCloudInfo);
        
        showToast("Lista publicada com sucesso!");
        window.location.hash = `#/list/${newCloudId}`;
    } catch(e) {
        showToast("Falha ao publicar lista.");
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  const handleMassUpdate = async (updateLogic: (batch: any, id: string) => void, localUpdate: (items: GroceryItem[]) => GroceryItem[], logMessage: string) => {
    const count = selectedItemIds.size;
    if (count === 0 || !activeListId) return;

    if (isCloudList) {
        const db = Firebase.getDb();
        if(!db) return;
        const batch = Firebase.writeBatch(db);
        selectedItemIds.forEach(id => updateLogic(batch, id));
        try {
            await batch.commit();
            showToast(logMessage);
        } catch (e) { showToast(`Falha na operação.`); }
    } else {
        setState(currentItems => localUpdate(currentItems));
        showToast(logMessage, { showUndo: true });
    }
    toggleSelectionMode();
  };

  const handleDeleteSelected = () => handleMassUpdate(
      (batch, id) => batch.delete(Firebase.doc(Firebase.getDb()!, 'lists', activeListId!, 'items', id)),
      items => items.filter(i => !selectedItemIds.has(i.id)),
      `${selectedItemIds.size} ${selectedItemIds.size > 1 ? 'itens excluídos' : 'item excluído'}.`
  );

  const handleCheckSelected = (checkState: boolean) => handleMassUpdate(
      (batch, id) => batch.update(Firebase.doc(Firebase.getDb()!, 'lists', activeListId!, 'items', id), { checked: checkState }),
      items => items.map(i => selectedItemIds.has(i.id) ? { ...i, checked: checkState } : i),
      `${selectedItemIds.size} ${selectedItemIds.size > 1 ? 'itens marcados' : 'item marcado'}.`
  );

  const handleZeroPriceSelected = () => {
    if (window.confirm(`Tem certeza que deseja zerar o preço de ${selectedItemIds.size} item(ns) selecionado(s)?`)) {
        handleMassUpdate(
            (batch, id) => batch.update(Firebase.doc(Firebase.getDb()!, 'lists', activeListId!, 'items', id), { unitPrice: 0 }),
            items => items.map(i => selectedItemIds.has(i.id) ? { ...i, unitPrice: 0 } : i),
            `Preços de ${selectedItemIds.size} ${selectedItemIds.size > 1 ? 'itens zerados' : 'item zerado'}.`
        );
    }
  };

  const toggleSelectionMode = useCallback(() => {
    setSelectionMode(prev => !prev);
    setSelectedItemIds(new Set());
  }, []);

  const toggleItemSelection = useCallback((id: string) => {
    setSelectedItemIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        return newSet;
    });
  }, []);

  const fabActions = useMemo(() => [
    { label: 'Iniciar Nova Lista', icon: <ListPlusIcon className="w-5 h-5"/>, onClick: () => handleCreateList('Nova Lista') },
    { label: 'Selecionar Itens', icon: <CheckBadgeIcon className="w-5 h-5"/>, onClick: toggleSelectionMode },
  ], [handleCreateList, toggleSelectionMode]);

  const availableCategories = useMemo(() => Array.from(new Set(items.map(i => i.category).filter(Boolean) as Category[])).sort((a, b) => a.localeCompare(b)), [items]);
  
  const categorySuggestionsForModal = useMemo(() => {
    const combined = new Set([...PREDEFINED_CATEGORIES, ...availableCategories]);
    return Array.from(combined).sort();
  }, [availableCategories]);
  
  const filteredItems = useMemo(() => items.filter(item => item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())).filter(item => selectedCategories.length === 0 || (item.category && selectedCategories.includes(item.category))), [items, debouncedSearchQuery, selectedCategories]);
  const sortedItems = useMemo(() => [...filteredItems].sort((a, b) => a.checked !== b.checked ? (a.checked ? 1 : -1) : 0), [filteredItems]);
  const orderedCategories = useMemo(() => Array.from(new Set(sortedItems.map(item => item.category || UNCATEGORIZED))).sort((a, b) => a === UNCATEGORIZED ? 1 : b === UNCATEGORIZED ? -1 : a.localeCompare(b)), [sortedItems]);
  const showNoResultsMessage = useMemo(() => (searchQuery.length > 0 || selectedCategories.length > 0) && sortedItems.length === 0 && items.length > 0, [searchQuery, selectedCategories, sortedItems, items]);

  const handleCategoryNavClick = useCallback((category: Category) => {
    document.getElementById(`category-header-${category}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (visitedLists === null) {
    return <div className="bg-gray-950 min-h-screen text-white flex items-center justify-center">Carregando App...</div>
  }

  return (
    <InteractiveBackground key={colorUpdateKey} mood={isCelebration ? 'celebration' : 'default'}>
      <div className="min-h-screen text-gray-300 font-sans flex flex-col">
        <div className="w-full max-w-2xl mx-auto flex-grow flex flex-col">
          <div className="bg-gray-950/70 backdrop-blur-lg">
            <ActionBar
              listName={activeListInfo?.name || 'Carregando...'}
              onOpenImport={() => setImportModalOpen(true)}
              onOpenListManager={() => setListManagerOpen(true)}
              onOpenShare={() => setShareModalOpen(true)}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onRenameList={handleRenameActiveList}
              isSelectionMode={isSelectionMode}
              onUndo={undo}
              onRedo={redo}
              canUndo={canUndo && !isCloudList}
              canRedo={canRedo && !isCloudList}
              isCloudList={!!isCloudList}
            />
            <div className="px-2 sm:px-4 lg:px-0">
              <CategoryFilter 
                selectedCategories={selectedCategories} 
                onToggleCategory={(cat) => setSelectedCategories(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat])}
                availableCategories={availableCategories}
              />
            </div>
          </div>
          <main className="px-2 sm:px-4 lg:px-0 pb-36 flex-grow">
              {isLoading && !items.length ? (
                 <GroceryListSkeleton />
              ) : (
                <GroceryList 
                    items={sortedItems}
                    onToggleChecked={handleToggleChecked}
                    onEditItem={setEditingItem}
                    onDeleteItem={handleDeleteItem}
                    showNoResultsMessage={showNoResultsMessage}
                    isSelectionMode={isSelectionMode}
                    selectedItemIds={selectedItemIds}
                    onToggleItemSelection={toggleItemSelection}
                    activeFilters={selectedCategories}
                    orderedCategories={orderedCategories}
                    onVisibleCategoryChange={setVisibleCategory}
                />
              )}
          </main>
        </div>

        <FunnyMessageDisplay funnyMessage={funnyMessage} onClose={() => setFunnyMessage(null)} />
        
        <AnimatePresence>
            {!isSelectionMode && items.length > 0 && (
                <CategoryNavigator categories={orderedCategories} activeCategory={visibleCategory} onCategoryClick={handleCategoryNavClick} />
            )}
        </AnimatePresence>

        <AnimatePresence>
            {!isSelectionMode && <SummaryFooter items={items} onToggleSelectionMode={toggleSelectionMode} />}
        </AnimatePresence>
        
        <AnimatePresence>
            {isSelectionMode && (
                <SelectionToolbar 
                    selectedCount={selectedItemIds.size}
                    totalCount={items.length}
                    onClose={toggleSelectionMode}
                    onDelete={handleDeleteSelected}
                    onCheck={handleCheckSelected}
                    onZeroPrice={handleZeroPriceSelected}
                    onSelectAll={() => setSelectedItemIds(prev => prev.size === items.length ? new Set() : new Set(items.map(i => i.id)))}
                />
            )}
        </AnimatePresence>

        <AnimatePresence>
        {!isSelectionMode && (
            <>
                <MenuFAB actions={fabActions} />
                <button 
                  onClick={handleAddItem} 
                  className="fixed bottom-6 right-6 z-30 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                  aria-label="Adicionar novo item"
                >
                  <PlusIcon className="w-8 h-8" />
                </button>
            </>
        )}
        </AnimatePresence>

        <AnimatePresence>
          {editingItem && (
            <EditItemModal item={editingItem} onClose={() => setEditingItem(null)} onSave={handleSaveItem} onDelete={handleDeleteItem} availableCategories={categorySuggestionsForModal} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isImportModalOpen && ( <ImportModal onClose={() => setImportModalOpen(false)} onImport={handleImportList} /> )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isShareModalOpen && activeListInfo && (
            <ShareModal
              onClose={() => setShareModalOpen(false)}
              listInfo={activeListInfo}
              items={items}
              onPublish={handlePublishList}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isListManagerOpen && visitedLists && (
            <ListManagerModal onClose={() => setListManagerOpen(false)} lists={visitedLists} activeListId={activeListId} onSelectList={handleSelectList} onCreateList={handleCreateList} onRenameList={handleRenameList} onDeleteList={handleDeleteList} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <Toast key={toast.id} message={toast.message} onDismiss={handleToastDismiss} isFunnyMessageVisible={!!funnyMessage} canUndo={toast.showUndo && canUndo && !isCloudList} onUndo={handleUndo} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCelebration && <Fireworks />}
        </AnimatePresence>
      </div>
    </InteractiveBackground>
  );
};

export default App;
