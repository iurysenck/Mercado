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
    showToast('Item excluído.');
    setEditingItem(null);
  }, [setState, showToast]);

  const handleToggleChecked = useCallback((id: string, forceState?: boolean) => {
    let message = '';
    setState(prevItems => {
        const newItems = prevItems.map(i => {
            if (i.id === id) {
                const isChecked = typeof forceState === 'boolean' ? forceState : !i.checked;
                message = isChecked ? 'Item marcado como comprado.' : 'Item movido para a lista.';
                return { ...i, checked: isChecked };
            }
            return i;
        });
        return newItems;
    });
    if (message) showToast(message);
  }, [setState, showToast]);

  const handleClearChecked = useCallback(() => {
    if (window.confirm("Tem certeza que deseja remover todos os itens comprados? Esta ação não pode ser desfeita.")) {
      setState(prevItems => prevItems.filter(item => !item.checked), true); // Bypassing history for this action
      showToast('Itens comprados removidos.');
    }
  }, [setState, showToast]);
  
  const handleUncheckAll = useCallback(() => {
    setState(prevItems => prevItems.map(item => ({...item, checked: false})));
    showToast('Todos os itens marcados como pendentes.');
  }, [setState, showToast]);

  const handleResetPrices = useCallback(() => {
    if (window.confirm("Tem certeza que deseja zerar todos os preços? Esta ação redefine os preços de todos os itens para R$ 0,00.")) {
        setState(prevItems => prevItems.map(item => ({ ...item, unitPrice: 0 })));
        showToast('Todos os preços foram zerados.');
    }
  }, [setState, showToast]);
  
  const handleClearList = useCallback(() => {
    if (window.confirm("Tem certeza que deseja limpar todos os itens desta lista? Esta ação não pode ser desfeita.")) {
        setState([], true); // Bypass history
        showToast('Lista limpa.');
    }
  }, [setState, showToast]);

  const handleImportList = useCallback((importedItems: GroceryItem[]) => {
    setState(prevItems => [...importedItems, ...prevItems]);
    showToast(`${importedItems.length} itens importados.`);
    setImportModalOpen(false);
  }, [setState, showToast]);

  const handleToggleCategoryFilter = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredItems = useMemo(() => {
    return items
      .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(item => selectedCategories.length === 0 || (item.category && selectedCategories.includes(item.category)));
  }, [items, searchQuery, selectedCategories]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      if (a.checked !== b.checked) return a.checked ? 1 : -1;
      return 0; // Preserve manual order
    });
  }, [filteredItems]);

  const showNoResultsMessage = useMemo(() => {
      const isFilterActive = searchQuery.length > 0 || selectedCategories.length > 0;
      return isFilterActive && sortedItems.length === 0 && items.length > 0;
  }, [searchQuery, selectedCategories, sortedItems, items]);
  
  const handleReorderItems = useCallback((reorderedItems: GroceryItem[]) => {
      setState(reorderedItems);
      showToast('Ordem da lista atualizada.');
  }, [setState, showToast]);
  
  // List Management Handlers
  const handleCreateList = (name: string) => {
    const newId = crypto.randomUUID();
    const newList: GroceryListInfo = {
      id: newId,
      name,
      createdAt: new Date().toISOString(),
    };
    setLists(prev => [...prev, newList]);
    setActiveListId(newId);
    showToast(`Lista "${name}" criada.`);
    setListManagerOpen(false);
  };

  const handleRenameList = (id: string, newName: string) => {
    setLists(prev => prev.map(list => list.id === id ? { ...list, name: newName } : list));
    showToast('Lista renomeada.');
  };
  
  const handleRenameActiveList = (newName: string) => {
    if (activeListId) {
        handleRenameList(activeListId, newName);
    }
  };

  const handleDeleteList = (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta lista? Esta ação é permanente.")) return;
    const listsAfterDeletion = lists.filter(list => list.id !== id);
    setLists(listsAfterDeletion);

    if (activeListId === id) {
      if (listsAfterDeletion.length > 0) {
        setActiveListId(listsAfterDeletion[0].id);
      } else {
        const firstListId = crypto.randomUUID();
        const firstList: GroceryListInfo = { id: firstListId, name: 'Minha Lista de Compras', createdAt: new Date().toISOString() };
        setLists([firstList]);
        setActiveListId(firstListId);
        window.localStorage.setItem(`grocery-list-history-${firstListId}`, JSON.stringify([[]]));
      }
    }
    window.localStorage.removeItem(`grocery-list-history-${id}`);
    showToast('Lista excluída.');
  };

  const activeList = useMemo(() => lists.find(l => l.id === activeListId), [lists, activeListId]);

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