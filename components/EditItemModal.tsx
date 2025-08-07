import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { TrashIcon, PasteIcon, ChevronDownIcon, PlusIcon, MinusIcon } from './IconComponents';

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

const QuantityInput: React.FC<{ value: number; onChange: (value: number) => void; }> = ({ value, onChange }) => {
    const handleIncrement = () => {
        onChange(value + 1);
    };

    const handleDecrement = () => {
        if (value > 1) {
            onChange(value - 1);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value) || 1;
        onChange(Math.max(1, newValue));
    };

    return (
        <div className="flex items-center bg-gray-900/50 border-2 border-white/10 rounded-md overflow-hidden">
            <button
                type="button"
                onClick={handleDecrement}
                className="p-3 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                disabled={value <= 1}
            >
                <MinusIcon className="w-4 h-4" />
            </button>
            <input
                type="number"
                inputMode="numeric"
                value={value}
                onChange={handleInputChange}
                min="1"
                className="w-full bg-transparent p-3 text-white text-center focus:outline-none focus:ring-0 border-0"
            />
            <button
                type="button"
                onClick={handleIncrement}
                className="p-3 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
            >
                <PlusIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

const CategorySelect: React.FC<{ value: Category | null; onChange: (category: Category | null) => void; }> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gray-900/50 backdrop-blur-xl border-2 border-white/20 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between transition-all duration-200 hover:bg-gray-800/50"
            >
                <span className={value ? 'text-white' : 'text-gray-400'}>
                    {value || 'Selecione uma categoria'}
                </span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-md shadow-2xl z-10 max-h-60 overflow-y-auto"
                    >
                        <div className="p-1">
                            <button
                                onClick={() => {
                                    onChange(null);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-white/10 hover:text-white rounded-md transition-colors"
                            >
                                Nenhuma categoria
                            </button>
                            {Object.values(Category).map(category => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        onChange(category);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                        value === category 
                                            ? 'bg-blue-500/20 text-blue-300' 
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose, onSave, onDelete }) => {
    const [editedItem, setEditedItem] = useState<GroceryItem>(item);

    const handleFieldChange = <K extends keyof GroceryItem>(field: K, value: GroceryItem[K]) => {
        setEditedItem(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (editedItem.name.trim()) {
            onSave(editedItem);
        }
    };

    const handleDelete = () => {
        onDelete(item.id);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl w-full max-w-md mx-4 max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white">Editar Item</h2>
                        <button
                            onClick={handleDelete}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-colors"
                            aria-label="Excluir item"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>

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
                            <QuantityInput value={editedItem.quantity} onChange={(val) => handleFieldChange('quantity', val)} />
                        </div>
                         <div>
                            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-300 mb-1">Preço Unitário (R$)</label>
                            <CurrencyInput value={editedItem.unitPrice} onChange={(val) => handleFieldChange('unitPrice', val)} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
                        <CategorySelect 
                            value={editedItem.category} 
                            onChange={(category) => handleFieldChange('category', category)} 
                        />
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
    </AnimatePresence>
    );
};