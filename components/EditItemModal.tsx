

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { CloseIcon, TrashIcon, PasteIcon, MinusIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, PaletteIcon } from './IconComponents';
import { getCategoryStyle } from '../constants';
import { ColorPalettePicker } from './ColorPalettePicker';
import { useModal } from '../hooks/useModal';

interface CurrencyInputProps {
    value: number;
    onChange: (value: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange }) => {
    const [displayValue, setDisplayValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const numericValue = value || 0;
        const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(numericValue)
            .replace('R$', '')
            .trim();
        setDisplayValue(formatted);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const numericValue = Number(rawValue.replace(/[^\d]/g, '')) / 100;
        onChange(isNaN(numericValue) ? 0 : numericValue);
    };

    return (
        <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            placeholder="0,00"
            className="w-full bg-gray-800/60 backdrop-blur-xl border border-white/10 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
        />
    );
};

interface EditItemModalProps {
    item: GroceryItem;
    onClose: () => void;
    onSave: (item: GroceryItem) => void;
    onDelete: (id: string) => void;
    availableCategories: Category[];
}

export const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose, onSave, onDelete, availableCategories }) => {
    const [editedItem, setEditedItem] = useState<GroceryItem>(item);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const { showConfirmation } = useModal();
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    useEffect(() => {
      setEditedItem(item);
    }, [item]);

    const handleFieldChange = <K extends keyof Omit<GroceryItem, 'id'>>(field: K, value: GroceryItem[K]) => {
        setEditedItem(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const isNewAndEmpty = item.id.startsWith('new-') && !editedItem.name.trim();
        if (isNewAndEmpty) {
            onClose();
            return;
        }
        onSave({...editedItem, category: editedItem.category?.trim().toUpperCase() || null });
    };

    const handleDelete = async () => {
        if (!item.id.startsWith('new-')) {
            const confirmed = await showConfirmation({
                title: 'Excluir Item',
                message: `Tem certeza que deseja excluir "${editedItem.name || 'este item'}"?`,
                confirmText: 'Excluir',
                cancelText: 'Cancelar',
                variant: 'danger'
            });
            if (confirmed) {
                onDelete(editedItem.id);
            }
        }
    };
    
    const handleBackdropClick = () => {
        onClose();
    }
    
    const categoryStyle = getCategoryStyle(editedItem.category);

    const checkScroll = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            const scrollBuffer = 2; // to account for sub-pixel rendering issues
            setShowLeftArrow(hasOverflow && el.scrollLeft > scrollBuffer);
            setShowRightArrow(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - scrollBuffer);
        }
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el) {
            checkScroll();
            el.addEventListener('scroll', checkScroll, { passive: true });
            window.addEventListener('resize', checkScroll);
            const observer = new MutationObserver(checkScroll);
            observer.observe(el, { childList: true, subtree: true });
            return () => {
                el.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
                observer.disconnect();
            };
        }
    }, [availableCategories, checkScroll]);

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.8;
            el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-40"
            onClick={handleBackdropClick}
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
                    <button onClick={onClose} className="p-3 -m-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
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
                                className="w-full bg-gray-800/60 backdrop-blur-xl border border-white/10 rounded-md p-3 pr-16 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                             <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        const text = await navigator.clipboard.readText();
                                        handleFieldChange('name', text);
                                    } catch (err) {
                                        showConfirmation({
                                            title: 'Erro ao Colar',
                                            message: 'Não foi possível ler da área de transferência. Verifique as permissões do seu navegador.',
                                            confirmText: 'OK',
                                            cancelText: null,
                                            variant: 'danger',
                                        });
                                        console.error('Failed to paste from clipboard', err);
                                    }
                                }}
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-white"
                                aria-label="Colar nome do produto"
                            >
                                <PasteIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">Quantidade</label>
                            <div className="flex items-center justify-between bg-gray-800/60 backdrop-blur-xl border border-white/10 rounded-md p-0 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('quantity', Math.max(1, editedItem.quantity - 1))}
                                    className="p-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-l-md"
                                    aria-label="Diminuir quantidade"
                                >
                                    <MinusIcon className="w-4 h-4"/>
                                </button>
                                <input
                                    id="quantity"
                                    type="text"
                                    inputMode="numeric"
                                    value={editedItem.quantity}
                                    onChange={(e) => handleFieldChange('quantity', parseInt(e.target.value, 10) || 1)}
                                    onBlur={(e) => {
                                        const val = parseInt(e.target.value, 10);
                                        if (e.target.value === '' || isNaN(val) || val < 1) {
                                            handleFieldChange('quantity', 1);
                                        }
                                    }}
                                    className="w-full text-center bg-transparent font-semibold text-lg p-0 h-full text-white focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('quantity', editedItem.quantity + 1)}
                                    className="p-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-r-md"
                                    aria-label="Aumentar quantidade"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-300 mb-1">Preço Unitário (R$)</label>
                            <CurrencyInput value={editedItem.unitPrice} onChange={(val) => handleFieldChange('unitPrice', val)} />
                        </div>
                    </div>

                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
                         <div className="relative">
                            <input
                                id="category"
                                type="text"
                                list="category-suggestions"
                                value={editedItem.category || ''}
                                onChange={(e) => handleFieldChange('category', e.target.value)}
                                placeholder="Ex: HIGIENE ou crie uma nova"
                                className="w-full bg-gray-800/60 backdrop-blur-xl border border-white/10 rounded-md p-3 pr-12 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                             {editedItem.category && (
                                <button
                                    type="button"
                                    onClick={() => setIsColorPickerOpen(true)}
                                    title="Mudar cor da categoria"
                                    className="absolute inset-y-0 right-0 flex items-center px-3"
                                >
                                    <div className={`w-6 h-6 rounded-full ${categoryStyle.swatch} flex items-center justify-center shadow-md border-2 border-white/20`}>
                                        <PaletteIcon className="w-4 h-4 text-white" style={{filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.8))'}}/>
                                    </div>
                                </button>
                            )}
                         </div>
                        <datalist id="category-suggestions">
                            {availableCategories.map(cat => (
                                <option key={cat} value={cat} />
                            ))}
                        </datalist>
                        
                        {availableCategories.length > 0 && (
                            <div className="relative mt-3">
                                <AnimatePresence>
                                {showLeftArrow && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => scroll('left')}
                                        className="absolute left-0 -translate-x-1 top-1/2 -translate-y-1/2 z-10 h-full px-2 bg-gradient-to-r from-gray-800 via-gray-800 to-transparent flex items-center"
                                        aria-label="Rolar categorias para a esquerda"
                                    >
                                        <ChevronLeftIcon className="w-6 h-6 text-white bg-black/40 rounded-full p-0.5" />
                                    </motion.button>
                                )}
                                </AnimatePresence>
                                <div 
                                    ref={scrollContainerRef} 
                                    className="flex items-center gap-2 overflow-x-auto py-1 -my-1 mx-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                >
                                    {availableCategories.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => handleFieldChange('category', cat)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-all duration-200 border flex-shrink-0 ${
                                            editedItem.category === cat
                                            ? getCategoryStyle(cat).tag
                                            : 'bg-gray-800/50 border-gray-700/80 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                    ))}
                                </div>
                                <AnimatePresence>
                                {showRightArrow && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => scroll('right')}
                                        className="absolute right-0 translate-x-1 top-1/2 -translate-y-1/2 z-10 h-full px-2 bg-gradient-to-l from-gray-800 via-gray-800 to-transparent flex items-center"
                                        aria-label="Rolar categorias para a direita"
                                    >
                                        <ChevronRightIcon className="w-6 h-6 text-white bg-black/40 rounded-full p-0.5" />
                                    </motion.button>
                                )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                     <div className="flex items-center justify-between bg-gray-800/60 backdrop-blur-xl border border-white/10 rounded-md p-3">
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
                    {!item.id.startsWith('new-') ? (
                        <button onClick={handleDelete} className="p-3 text-sm font-semibold text-red-400 hover:bg-red-500/20 rounded-full transition-colors flex items-center justify-center gap-2" aria-label="Excluir item">
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    ) : (
                        <div /> 
                    )}
                    <button onClick={handleSave} className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors">
                        Salvar
                    </button>
                </footer>
            </motion.div>
            <AnimatePresence>
                {isColorPickerOpen && editedItem.category && (
                    <ColorPalettePicker 
                        categoryName={editedItem.category}
                        onClose={() => setIsColorPickerOpen(false)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};