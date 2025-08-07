import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GroceryListInfo } from '../types';
import { CloseIcon, PlusIcon, EditIcon, TrashIcon, PasteIcon } from './IconComponents';

interface ListManagerModalProps {
    onClose: () => void;
    lists: GroceryListInfo[];
    activeListId: string;
    onSelectList: (id: string) => void;
    onCreateList: (name: string) => void;
    onRenameList: (id: string, newName: string) => void;
    onDeleteList: (id: string) => void;
}

export const ListManagerModal: React.FC<ListManagerModalProps> = ({
    onClose, lists, activeListId, onSelectList, onCreateList, onRenameList, onDeleteList
}) => {
    const [newListName, setNewListName] = useState('');

    const handleCreate = () => {
        if (newListName.trim()) {
            onCreateList(newListName.trim());
            setNewListName('');
        }
    };
    
    const handleRename = (id: string) => {
        const currentName = lists.find(l => l.id === id)?.name || '';
        const newName = prompt("Digite o novo nome da lista:", currentName);
        if (newName && newName.trim() !== '' && newName !== currentName) {
            onRenameList(id, newName.trim());
        }
    }
    
    const sortedLists = [...lists].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-40"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: "100%", opacity: 0.8 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0.8 }}
                transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                className="bg-gray-800/60 backdrop-blur-xl border border-white/10 w-full max-w-2xl h-full md:h-auto md:max-h-[90vh] rounded-t-2xl md:rounded-2xl flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Gerenciar Listas</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                        <CloseIcon />
                    </button>
                </header>

                <main className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                    <div className="space-y-2">
                        {sortedLists.map(list => (
                            <div
                                key={list.id}
                                className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${list.id === activeListId ? 'bg-blue-500/20' : 'bg-white/5 hover:bg-white/10'}`}
                                onClick={() => onSelectList(list.id)}
                            >
                                <div className="flex-grow">
                                    <p className="font-semibold text-white">{list.name}</p>
                                    <p className="text-xs text-gray-400">Criada em: {new Date(list.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={(e) => { e.stopPropagation(); handleRename(list.id); }} className="p-2 text-gray-300 hover:text-white hover:bg-white/20 rounded-md"><EditIcon className="w-4 h-4"/></button>
                                    <button onClick={(e) => { e.stopPropagation(); onDeleteList(list.id); }} className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-md"><TrashIcon className="w-4 h-4"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                
                <footer className="p-4 mt-auto border-t border-white/10 flex-shrink-0">
                    <div className="flex gap-2">
                         <div className="relative flex-grow">
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                                placeholder="Digite o nome da nova lista..."
                                className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md p-3 pr-12 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        const text = await navigator.clipboard.readText();
                                        setNewListName(text);
                                    } catch (err) {
                                        console.error('Failed to paste from clipboard', err);
                                    }
                                }}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white"
                                aria-label="Colar nome da lista"
                            >
                                <PasteIcon className="w-5 h-5"/>
                            </button>
                        </div>
                         <button onClick={handleCreate} className="px-4 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center gap-2">
                            <PlusIcon className="w-5 h-5" />
                            <span>Criar</span>
                        </button>
                    </div>
                </footer>
            </motion.div>
        </motion.div>
    );
};
