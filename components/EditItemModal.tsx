import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { CloseIcon, TrashIcon, PasteIcon } from './IconComponents';

interface EditItemModalProps {
    item: GroceryItem;
    onClose: () => void;
    onSave: (item: GroceryItem) => void;
    onDelete: (id: string) => void;
}

const CurrencyInput: React.FC<{ value: number; onChange: (value: number) => void; }> = ({ value, onChange }) => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        const valueAsCents = Math.round(value * 100);
        const displayAsCents = parseInt(displayValue.replace(/[^\d]/g, ''), 10) || 0;

        // Sync with parent state only if the values are different.
        // This is crucial to avoid interrupting the user while they are typing.
        if (valueAsCents !== displayAsCents) {
             if (value > 0) {
                const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value);
                setDisplayValue(formatted);
            } else {
                setDisplayValue('');
            }
        }
    }, [value, displayValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const digits = rawValue.replace(/[^\d]/g, '');

        if (digits === '') {
            onChange(0);
            setDisplayValue('');
            return;
        }
        
        const cents = parseInt(digits, 10);
        const floatValue = cents / 100;
        
        onChange(floatValue);
        
        const formatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(floatValue);
        setDisplayValue(formatted);
    };

    return (
        <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            placeholder="0,00"
            className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
        />
    );
};


export const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose, onSave, onDelete }) => {
    const [editedItem, setEditedItem] = useState<GroceryItem>(item);

    useEffect(() => {
      setEditedItem(item);
    }, [item]);

    const handleFieldChange = <K extends keyof Omit<GroceryItem, 'id'>>(field: K, value: GroceryItem[K]) => {
        setEditedItem(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Prevent saving an item with no name if it's new
        const isNew = !item.name;
        if (isNew && !editedItem.name.trim()) {
            onClose(); // Just close if no name entered for a new item.
            return;
        }
        onSave(editedItem);
    };

    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir "${editedItem.name || 'este item'}"?`)) {
            onDelete(editedItem.id);
        }
    };
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-40"
            onClick={handleSave} // Save on clicking away
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
                    <h2 className="text-xl font-bold text-white">{item.name ? 'Editar Item' : 'Novo Item'}</h2>
                    <button onClick={handleSave} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                        <CloseIcon />
                    </button>
                </header>

                <main className="p-4 sm:p-6 space-y-6 overflow-y-auto">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome do Produto</label>
                        <div className="relative">
                            <input
                                id="name"
                                type="text"
                                value={editedItem.name}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                placeholder="Ex: Bananas Orgânicas"
                                className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md p-3 pr-12 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                autoFocus
                            />
                             <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        const text = await navigator.clipboard.readText();
                                        handleFieldChange('name', text);
                                    } catch (err) {
                                        console.error('Failed to paste from clipboard', err);
                                    }
                                }}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                aria-label="Colar nome do produto"
                            >
                                <PasteIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">Quantidade</label>
                            <input
                                id="quantity"
                                type="number"
                                inputMode="numeric"
                                value={editedItem.quantity}
                                onChange={(e) => handleFieldChange('quantity', parseInt(e.target.value) || 1)}
                                className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                         <div>
                            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-300 mb-1">Preço Unitário (R$)</label>
                            <CurrencyInput value={editedItem.unitPrice} onChange={(val) => handleFieldChange('unitPrice', val)} />
                        </div>
                    </div>

                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
                        <select
                            id="category"
                            value={editedItem.category || ''}
                            onChange={(e) => handleFieldChange('category', e.target.value as Category)}
                            className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            {Object.values(Category).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                     <div className="flex items-center justify-between bg-gray-900/50 border-2 border-white/10 rounded-md p-3">
                        <label htmlFor="checked" className="font-medium text-white cursor-pointer">
                            Item já está no carrinho?
                        </label>
                        <input
                            id="checked"
                            type="checkbox"
                            checked={editedItem.checked}
                            onChange={(e) => handleFieldChange('checked', e.target.checked)}
                            className="h-6 w-6 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-600 cursor-pointer"
                        />
                    </div>
                </main>
                
                <footer className="flex justify-between items-center p-4 mt-auto border-t border-white/10 flex-shrink-0">
                    <button onClick={handleDelete} className="p-3 text-sm font-semibold text-red-400 hover:bg-red-500/20 rounded-full transition-colors flex items-center justify-center gap-2">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={handleSave} className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors">
                        Salvar Alterações
                    </button>
                </footer>
            </motion.div>
        </motion.div>
    );
};