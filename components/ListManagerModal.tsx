

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { GroceryListInfo } from '../types';
import { CloseIcon, PlusIcon, EditIcon, TrashIcon, PasteIcon, SettingsIcon, GithubIcon, ResetIcon, LampIcon } from './IconComponents';
import { FUNNY_LIST_NAMES, VISITED_LISTS_KEY } from '../constants';
import { useModal } from '../hooks/useModal';

interface ListManagerModalProps {
    onClose: () => void;
    lists: GroceryListInfo[];
    activeListId: string | null;
    onSelectList: (id: string) => void;
    onCreateList: (name: string) => void;
    onRenameList: (id: string, newName: string) => void;
    onDeleteList: (id: string) => void;
    onClearData: () => void;
}

export const ListManagerModal: React.FC<ListManagerModalProps> = ({
    onClose, lists, activeListId, onSelectList, onCreateList, onRenameList, onDeleteList, onClearData
}) => {
    const [newListName, setNewListName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);
    const { showConfirmation } = useModal();

    const placeholderName = useMemo(() => {
        return FUNNY_LIST_NAMES[Math.floor(Math.random() * FUNNY_LIST_NAMES.length)];
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };
        if (isSettingsOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSettingsOpen]);

    const shakeVariants: Variants = {
        initial: { x: 0 },
        animate: {
            x: [0, -8, 8, -8, 8, 0],
            transition: { type: 'spring', stiffness: 500, damping: 20, duration: 0.5 }
        }
    };

    const handleClearDataClick = async () => {
        const confirmed = await showConfirmation({
            title: 'Limpar Todos os Dados',
            message: "Você tem certeza que deseja limpar todos os dados do aplicativo? Isso removerá todas as suas listas e configurações e não pode ser desfeito.",
            confirmText: 'Sim, Limpar Tudo',
            cancelText: 'Cancelar',
            variant: 'danger'
        });

        if (confirmed) {
            setIsSettingsOpen(false);
            onClearData();
        }
    };

    const handleCreate = () => {
        if (newListName.trim()) {
            onCreateList(newListName.trim());
            setNewListName('');
            setNameError(false);
        } else {
            setNameError(true);
            setTimeout(() => setNameError(false), 600);
        }
    };
    
    const handleRename = (id: string) => {
        const currentName = lists.find(l => l.id === id)?.name || '';
        const newName = prompt("Digite o novo nome da lista:", currentName);
        if (newName && newName.trim() !== '' && newName !== currentName) {
            onRenameList(id, newName.trim());
        }
    }

    const handleSuggestName = () => {
        let newSuggestion = FUNNY_LIST_NAMES[Math.floor(Math.random() * FUNNY_LIST_NAMES.length)];
        // Simple way to avoid suggesting the same name twice in a row
        if (newSuggestion === newListName) {
            newSuggestion = FUNNY_LIST_NAMES[Math.floor(Math.random() * FUNNY_LIST_NAMES.length)];
        }
        setNewListName(newSuggestion);
        if (nameError) setNameError(false);
    };
    
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
                    <div className="flex items-center gap-2 relative" ref={settingsRef}>
                        <h2 className="text-xl font-bold text-white">Gerenciar Listas</h2>
                        <button onClick={() => setIsSettingsOpen(p => !p)} className="p-2 -m-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full" aria-label="Configurações">
                            <SettingsIcon className="w-5 h-5"/>
                        </button>
                        <AnimatePresence>
                        {isSettingsOpen && (
                             <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.1 }}
                                className="absolute top-full left-0 mt-2 w-72 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-10 origin-top-left"
                            >
                                <div className="p-2 space-y-1">
                                    <button
                                        onClick={handleClearDataClick}
                                        className="w-full text-left p-3 text-sm text-red-400 hover:bg-red-500/20 rounded-md transition-colors"
                                    >
                                        <div className="flex items-center gap-3 font-semibold">
                                            <TrashIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>Limpar dados do app</span>
                                        </div>
                                        <p className="pl-[28px] text-xs text-red-400/80 mt-1 font-normal">
                                            Remove todas as listas e reinicia o aplicativo. Ação irreversível.
                                        </p>
                                    </button>
                                    <div className="border-b border-white/10 my-1"></div>
                                    <a
                                        href="https://github.com/iurysenck/Mercado"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-md transition-colors"
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <GithubIcon className="w-4 h-4" />
                                        <span>Créditos: Iury Senck</span>
                                    </a>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    <button onClick={onClose} className="p-3 -m-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
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
                                <div className="flex-grow flex items-center gap-3">
                                    <div className="w-5 h-5 flex-shrink-0" />
                                    <div className="flex-grow">
                                      <p className="font-semibold text-white">{list.name}</p>
                                      <p className="text-xs text-gray-400">Criada em: {new Date(list.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={(e) => { e.stopPropagation(); handleRename(list.id); }} className="p-3 text-gray-300 hover:text-white hover:bg-white/20 rounded-full"><EditIcon className="w-5 h-5"/></button>
                                    <button onClick={(e) => { e.stopPropagation(); onDeleteList(list.id); }} className="p-3 text-red-400 hover:text-white hover:bg-red-500/20 rounded-full"><TrashIcon className="w-5 h-5"/></button>
                                </div>
                            </div>
                        ))}
                         {lists.length === 0 && (
                            <p className="text-center text-gray-400 py-8">Nenhuma lista encontrada. Crie uma abaixo!</p>
                        )}
                    </div>
                </main>
                
                <footer className="p-4 mt-auto border-t border-white/10 flex-shrink-0">
                    <div className="flex gap-2">
                        <motion.div
                            variants={shakeVariants}
                            animate={nameError ? "animate" : "initial"}
                            className="relative flex-grow"
                        >
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => {
                                    setNewListName(e.target.value);
                                    if(nameError) setNameError(false);
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                                placeholder={`Nome da nova lista (Ex: ${placeholderName})`}
                                className={`w-full bg-gray-900/50 border-2 rounded-md p-3 pr-28 text-white focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${nameError ? 'border-red-500/80 ring-red-500/50' : 'border-white/10 focus:border-blue-500'}`}
                            />
                            <button
                                type="button"
                                onClick={handleSuggestName}
                                className="absolute inset-y-0 right-12 flex items-center justify-center px-4 text-gray-400 hover:text-white"
                                aria-label={newListName.trim() === '' ? "Sugerir um nome" : "Sugerir outro nome"}
                                title={newListName.trim() === '' ? "Sugerir um nome" : "Sugerir outro nome"}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={newListName.trim() === '' ? 'lamp' : 'reset'}
                                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {newListName.trim() === '' ? (
                                            <LampIcon className="w-5 h-5"/>
                                        ) : (
                                            <ResetIcon className="w-5 h-5"/>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        const text = await navigator.clipboard.readText();
                                        setNewListName(text);
                                    } catch (err)
                                        {
                                        console.error('Failed to paste from clipboard', err);
                                    }
                                }}
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-white"
                                aria-label="Colar nome da lista"
                            >
                                <PasteIcon className="w-5 h-5"/>
                            </button>
                        </motion.div>
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