import React, { useState, useEffect } from 'react';
import { UndoIcon, RedoIcon, MoreVerticalIcon, UploadIcon, ResetIcon, ListBulletIcon, SearchIcon, BroomIcon, PasteIcon, ShareIcon } from './IconComponents';

interface ActionBarProps {
    listName: string;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onOpenImport: () => void;
    onOpenShare: () => void;
    onResetPrices: () => void;
    onOpenListManager: () => void;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    onClearList: () => void;
    onRenameList: (newName: string) => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ 
    listName, onUndo, onRedo, canUndo, canRedo, onOpenImport, onOpenShare, onResetPrices, onOpenListManager,
    searchQuery, onSearchQueryChange, onClearList, onRenameList
}) => {
    const buttonClass = "p-2 rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed";
    const enabledClass = "hover:bg-white/20";
    
    const [isEditing, setIsEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(listName);

    useEffect(() => {
        setEditingValue(listName);
    }, [listName]);

    const handleRename = () => {
        if (editingValue.trim() && editingValue !== listName) {
            onRenameList(editingValue.trim());
        }
        setIsEditing(false);
    };

    return (
        <header className="sticky top-0 z-20 bg-gray-950/70 backdrop-blur-lg px-4 pt-5 pb-3 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <button onClick={onOpenListManager} className={`${buttonClass} bg-white/10 ${enabledClass}`} aria-label="Gerenciar listas">
                        <ListBulletIcon className="w-5 h-5 text-gray-300" />
                    </button>
                    {isEditing ? (
                         <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleRename}
                            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                            className="text-2xl font-bold text-white tracking-tight bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
                            autoFocus
                        />
                    ) : (
                        <h1 onClick={() => setIsEditing(true)} className="text-2xl font-bold text-white tracking-tight truncate cursor-pointer" title={listName}>
                            {listName}
                        </h1>
                    )}
                </div>
                <div className="flex items-center space-x-1">
                    <button 
                        onClick={onUndo} 
                        disabled={!canUndo} 
                        className={`${buttonClass} ${canUndo ? `bg-white/10 ${enabledClass}` : 'bg-white/5'}`}
                        aria-label="Desfazer"
                        title="Desfazer"
                    >
                        <UndoIcon className="w-5 h-5 text-gray-300" />
                    </button>
                    <button 
                        onClick={onRedo} 
                        disabled={!canRedo} 
                        className={`${buttonClass} ${canRedo ? `bg-white/10 ${enabledClass}` : 'bg-white/5'}`}
                        aria-label="Refazer"
                        title="Refazer"
                    >
                        <RedoIcon className="w-5 h-5 text-gray-300" />
                    </button>
                    <div className="relative">
                        <details className="group">
                            <summary className={`list-none cursor-pointer ${buttonClass} bg-white/10 ${enabledClass}`}>
                                <MoreVerticalIcon className="w-5 h-5 text-gray-300" />
                            </summary>
                            <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800/80 backdrop-blur-xl border border-white/10 rounded-md shadow-lg z-10 origin-top-right transition-opacity duration-100 opacity-0 group-open:opacity-100">
                                <div className="p-1">
                                    <button onClick={onOpenImport} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-md transition-colors">
                                        <UploadIcon className="w-4 h-4" />
                                        <span>Importar Lista...</span>
                                    </button>
                                     <button onClick={onOpenShare} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-md transition-colors">
                                        <ShareIcon className="w-4 h-4" />
                                        <span>Compartilhar Lista...</span>
                                    </button>
                                    <button onClick={onResetPrices} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded-md transition-colors">
                                        <ResetIcon className="w-4 h-4" />
                                        <span>Zerar Todos os Preços</span>
                                    </button>
                                     <button onClick={onClearList} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
                                        <BroomIcon className="w-4 h-4" />
                                        <span>Limpar Todos os Itens</span>
                                    </button>
                                </div>
                            </div>
                        </details>
                    </div>
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
                    className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md py-2 pl-10 pr-12 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                 <button
                    type="button"
                    onClick={async () => {
                        try {
                            const text = await navigator.clipboard.readText();
                            onSearchQueryChange(text);
                        } catch (err) {
                            console.error('Failed to paste from clipboard', err);
                        }
                    }}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white"
                    aria-label="Colar texto de busca"
                >
                    <PasteIcon className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};
