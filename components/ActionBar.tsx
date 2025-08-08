

import React, { useState, useEffect } from 'react';
import { UploadIcon, ListBulletIcon, SearchIcon, PasteIcon, ShareIcon, UndoIcon, RedoIcon, CloudIcon } from './IconComponents';

interface ActionBarProps {
    listName: string;
    onOpenImport: () => void;
    onOpenShare: () => void;
    onOpenListManager: () => void;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    onRenameList: (newName: string) => void;
    isSelectionMode: boolean;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    isCloudList: boolean;
}

export const ActionBar: React.FC<ActionBarProps> = ({ 
    listName, onOpenImport, onOpenShare, onOpenListManager,
    searchQuery, onSearchQueryChange, onRenameList, isSelectionMode,
    onUndo, onRedo, canUndo, canRedo, isCloudList
}) => {
    const actionButtonClass = "p-3 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-white/10";
    
    const [isEditing, setIsEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(listName);

    useEffect(() => {
        if (!isEditing) {
            setEditingValue(listName);
        }
    }, [listName, isEditing]);

    const handleRename = () => {
        if (editingValue.trim() && editingValue !== listName) {
            onRenameList(editingValue.trim());
        }
        setIsEditing(false);
    };
    
    useEffect(() => {
        if (isSelectionMode) {
            setIsEditing(false);
        }
    }, [isSelectionMode]);

    return (
        <header className="px-4 pt-5 pb-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <button onClick={onOpenListManager} className="p-3 -m-3 rounded-full transition-all duration-200 hover:bg-white/10 disabled:opacity-30 flex-shrink-0" aria-label="Gerenciar listas" disabled={isSelectionMode}>
                        <ListBulletIcon className="w-6 h-6 text-gray-300" />
                    </button>
                    {isEditing ? (
                         <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleRename}
                            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                            className="text-lg font-bold text-white tracking-tight bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
                            autoFocus
                        />
                    ) : (
                        <div className="flex items-center gap-2 min-w-0" onClick={() => !isSelectionMode && setIsEditing(true)}>
                            <h1 className={`text-lg font-bold text-white tracking-tight truncate ${!isSelectionMode ? 'cursor-pointer' : ''}`} title={listName}>
                                {listName}
                            </h1>
                            {isCloudList && (
                                <span title="Esta lista está na nuvem e é sincronizada em tempo real.">
                                    <CloudIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-0 flex-shrink-0">
                    <button onClick={onUndo} disabled={!canUndo} className={actionButtonClass} aria-label="Desfazer">
                        <UndoIcon className="w-5 h-5" />
                    </button>
                    <button onClick={onRedo} disabled={!canRedo} className={actionButtonClass} aria-label="Refazer">
                        <RedoIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onOpenImport}
                        className={actionButtonClass}
                        aria-label="Importar Lista"
                        title="Importar Lista"
                        disabled={isSelectionMode}
                    >
                        <UploadIcon className="w-5 h-5 text-gray-300" />
                    </button>
                    <button
                        onClick={onOpenShare}
                        className={actionButtonClass}
                        aria-label="Compartilhar Lista"
                        title="Compartilhar Lista"
                        disabled={isSelectionMode}
                    >
                        <ShareIcon className="w-5 h-5 text-gray-300" />
                    </button>
                </div>
            </div>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar por um item..."
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md py-2 pl-10 pr-14 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSelectionMode}
                />
                 <button
                    type="button"
                    onClick={async () => {
                        try {
                            const text = await navigator.clipboard.readText();
                            onSearchQueryChange(text);
                        } catch (err) {
                            console.error('Failed to read clipboard contents: ', err);
                        }
                    }}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-white"
                    aria-label="Colar texto de busca"
                    disabled={isSelectionMode}
                >
                    <PasteIcon className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};