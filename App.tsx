import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GroceryItem, Category, GroceryListInfo } from './types';
import { INITIAL_ITEMS } from './constants';
import { useHistoryState } from './hooks/useHistoryState';

import { ActionBar } from './components/ActionBar';
import { GroceryList } from './components/GroceryList';
import { SummaryFooter } from './components/TableFooter';
import { EditItemModal } from './components/EditItemModal';
import { ImportModal } from './components/ImportModal';
import { Toast } from './components/Toast';
import { PlusIcon } from './components/IconComponents';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ListManagerModal } from './components/ListManagerModal';
import { CategoryFilter } from './components/CategoryFilter';
import { ShareModal } from './components/ShareModal';
import { Fireworks } from './components/Fireworks';
import { AdvancedOptionsModal } from './components/AdvancedOptionsModal';

const APP_DATA_KEY = 'grocery-app-data-v2';

const App: React.FC = () => {
  const [lists, setLists] = useState<GroceryListInfo[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  
  const { state: items, setState, undo, redo, canUndo, canRedo } = useHistoryState<GroceryItem[]>(
    [],
    activeListId ? `grocery-list-history-${activeListId}` : 'noop'
  );

  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [isListManagerOpen, setListManagerOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isAdvancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number, message: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isCelebration, setCelebration] = useState(false);
  
  // Load initial data from localStorage
  useEffect(() => {
    try {
      const storedData = window.localStorage.getItem(APP_DATA_KEY);
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data.lists && data.activeListId) {
          setLists(data.lists);
          setActiveListId(data.activeListId);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to load app data", e);
    }
    
    // If no data, create the first list
    const firstListId = crypto.randomUUID();
    const firstList: GroceryListInfo = {
      id: firstListId,
      name: 'Minha Lista de Compras',
      createdAt: new Date().toISOString(),
    };
    const historyKey = `grocery-list-history-${firstListId}`;
    window.localStorage.setItem(historyKey, JSON.stringify([INITIAL_ITEMS]));

    setLists([firstList]);
    setActiveListId(firstListId);
  }, []);

  // Save metadata to localStorage
  useEffect(() => {
    if (lists.length > 0 && activeListId) {
      const data = { lists, activeListId };
      window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
    }
  }, [lists, activeListId]);
  
   // Check for celebration mode
  useEffect(() => {
    const allChecked = items.length > 0 && items.every(item => item.checked);
    if (allChecked) {
      setCelebration(true);
    } else {
      setCelebration(false);
    }
  }, [items]);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  // Função para reset completo do app
  const handleResetApp = useCallback(() => {
    // Limpar todos os dados do localStorage
    const keysToRemove: string[] = [];
    
    // Adicionar chaves de listas existentes
    lists.forEach(list => {
      keysToRemove.push(`grocery-list-history-${list.id}`);
    });
    
    // Adicionar chave principal
    keysToRemove.push(APP_DATA_KEY);
    
    // Remover todas as chaves
    keysToRemove.forEach(key => {
      window.localStorage.removeItem(key);
    });
    
    // Recriar lista inicial
    const firstListId = crypto.randomUUID();
    const firstList: GroceryListInfo = {
      id: firstListId,
      name: 'Minha Lista de Compras',
      createdAt: new Date().toISOString(),
    };
    const historyKey = `grocery-list-history-${firstListId}`;
    window.localStorage.setItem(historyKey, JSON.stringify([INITIAL_ITEMS]));

    setLists([firstList]);
    setActiveListId(firstListId);
    setState([INITIAL_ITEMS]);
    
    showToast('App resetado com sucesso!');
  }, [lists, setState, showToast]);

  const handleSaveItem = useCallback((itemToSave: GroceryItem) => {
    const itemExists = items.some(i => i.id === itemToSave.id);
    if (itemExists) {
        setState(prevItems => prevItems.map(item => item.id === itemToSave.id ? itemToSave : item));
        showToast('Item atualizado.');
    } else {
        setState(prevItems => [itemToSave, ...prevItems]);
        showToast('Item adicionado.');
    }
    setEditingItem(null);
  }, [items, setState, showToast]);

  const handleAddItem = useCallback(() => {
    const newItem: GroceryItem = {
      id: crypto.randomUUID(),
      checked: false,
      name: '',
      quantity: 1,
      unitPrice: 0,
      category: null,
    };
    setEditingItem(newItem);
  }, []);
  
  const handleDeleteItem = useCallback((id: string) => {
    setState(prevItems => prevItems.filter(item => item.id !== id));
    showToast('Item removido.');
  }, [setState, showToast]);

  const handleToggleChecked = useCallback((id: string) => {
    setState(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  }, [setState]);

  const handleReorderItems = useCallback((reorderedItems: GroceryItem[]) => {
    setState(reorderedItems);
  }, [setState]);

  const handleClearChecked = useCallback(() => {
    setState(prevItems => prevItems.filter(item => !item.checked));
    showToast('Itens comprados removidos.');
  }, [setState, showToast]);

  const handleUncheckAll = useCallback(() => {
    setState(prevItems => prevItems.map(item => ({ ...item, checked: false })));
    showToast('Todos os itens desmarcados.');
  }, [setState, showToast]);

  const handleClearList = useCallback(() => {
    setState([]);
    showToast('Lista limpa.');
  }, [setState, showToast]);

  const handleResetPrices = useCallback(() => {
    setState(prevItems => prevItems.map(item => ({ ...item, unitPrice: 0 })));
    showToast('Preços zerados.');
  }, [setState, showToast]);

  const handleImportList = useCallback((importedItems: GroceryItem[]) => {
    setState(importedItems);
    showToast('Lista importada com sucesso!');
    setImportModalOpen(false);
  }, [setState, showToast]);

  const handleToggleCategoryFilter = useCallback((category: Category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleCreateList = useCallback((name: string) => {
    const newListId = crypto.randomUUID();
    const newList: GroceryListInfo = {
      id: newListId,
      name,
      createdAt: new Date().toISOString(),
    };
    setLists(prev => [...prev, newList]);
    setActiveListId(newListId);
    setState([]);
    showToast('Nova lista criada.');
  }, [setState, showToast]);

  const handleRenameList = useCallback((id: string, newName: string) => {
    setLists(prev => prev.map(list => 
      list.id === id ? { ...list, name: newName } : list
    ));
    showToast('Lista renomeada.');
  }, [showToast]);

  const handleRenameActiveList = useCallback((newName: string) => {
    if (activeListId) {
      handleRenameList(activeListId, newName);
    }
  }, [activeListId, handleRenameList]);

  const handleDeleteList = useCallback((id: string) => {
    setLists(prev => prev.filter(list => list.id !== id));
    if (activeListId === id) {
      const remainingLists = lists.filter(list => list.id !== id);
      if (remainingLists.length > 0) {
        setActiveListId(remainingLists[0].id);
      } else {
        // Se não há mais listas, criar uma nova
        const newListId = crypto.randomUUID();
        const newList: GroceryListInfo = {
          id: newListId,
          name: 'Minha Lista de Compras',
          createdAt: new Date().toISOString(),
        };
        setLists([newList]);
        setActiveListId(newListId);
        setState([INITIAL_ITEMS]);
      }
    }
    showToast('Lista removida.');
  }, [activeListId, lists, setState, showToast]);

  const activeList = useMemo(() => 
    lists.find(list => list.id === activeListId), 
    [lists, activeListId]
  );

  const filteredItems = useMemo(() => {
    let filtered = items;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => 
        item.category && selectedCategories.includes(item.category)
      );
    }
    
    return filtered;
  }, [items, searchQuery, selectedCategories]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      if (a.checked !== b.checked) {
        return a.checked ? 1 : -1;
      }
      return a.name.localeCompare(b.name);
    });
  }, [filteredItems]);

  const showNoResultsMessage = searchQuery || selectedCategories.length > 0;

  return (
    <InteractiveBackground mood={isCelebration ? 'celebration' : 'default'}>
      <div className="min-h-screen text-gray-300 font-sans flex flex-col">
        <div className="w-full max-w-2xl mx-auto flex-grow flex flex-col">
          <ActionBar
            listName={activeList?.name || 'Carregando...'}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            onOpenImport={() => setImportModalOpen(true)}
            onResetPrices={handleResetPrices}
            onOpenListManager={() => setListManagerOpen(true)}
            onOpenShare={() => setShareModalOpen(true)}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onClearList={handleClearList}
            onRenameList={handleRenameActiveList}
            onOpenAdvancedOptions={() => setAdvancedOptionsOpen(true)}
          />
          <div className="px-2 sm:px-4 lg:px-0">
            <CategoryFilter selectedCategories={selectedCategories} onToggleCategory={handleToggleCategoryFilter} />
          </div>
          <main className="px-2 sm:px-4 lg:px-0 pb-40 flex-grow">
              <GroceryList 
                  items={sortedItems}
                  onToggleChecked={handleToggleChecked}
                  onEditItem={setEditingItem}
                  onReorderItems={handleReorderItems}
                  showNoResultsMessage={showNoResultsMessage}
              />
          </main>
        </div>
        <SummaryFooter items={items} onClearChecked={handleClearChecked} onUncheckAll={handleUncheckAll} />
        
        <button 
          onClick={handleAddItem} 
          className="fixed bottom-20 right-4 z-30 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
          aria-label="Adicionar novo item"
        >
          <PlusIcon className="w-6 h-6" />
        </button>

        <AnimatePresence>
          {editingItem && (
            <EditItemModal
              item={editingItem}
              onClose={() => setEditingItem(null)}
              onSave={handleSaveItem}
              onDelete={handleDeleteItem}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isImportModalOpen && (
            <ImportModal
              onClose={() => setImportModalOpen(false)}
              onImport={handleImportList}
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isShareModalOpen && activeListId && (
            <ShareModal
              onClose={() => setShareModalOpen(false)}
              lists={lists}
              activeListId={activeListId}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isListManagerOpen && activeListId && (
            <ListManagerModal
              onClose={() => setListManagerOpen(false)}
              lists={lists}
              activeListId={activeListId}
              onSelectList={setActiveListId}
              onCreateList={handleCreateList}
              onRenameList={handleRenameList}
              onDeleteList={handleDeleteList}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAdvancedOptionsOpen && (
            <AdvancedOptionsModal
              onClose={() => setAdvancedOptionsOpen(false)}
              onResetApp={handleResetApp}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <Toast
              key={toast.id}
              message={toast.message}
              onUndo={() => {
                if(canUndo) undo();
                setToast(null);
              }}
              onDismiss={() => setToast(null)}
              canUndo={canUndo}
            />
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