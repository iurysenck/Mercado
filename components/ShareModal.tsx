
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, CopyIcon, WhatsAppIcon, CheckIcon } from './IconComponents';
import { GroceryItem, GroceryListInfo } from '../types';
import { UNCATEGORIZED } from '../constants';
import { useModal } from '../hooks/useModal';

type TextFormat = 'formatted' | 'json' | 'csv';

interface ShareModalProps {
    onClose: () => void;
    listInfo: GroceryListInfo;
    items: GroceryItem[];
}

const FormatTabButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            isActive 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-300 hover:bg-white/10'
        }`}
    >
        {children}
    </button>
);


export const ShareModal: React.FC<ShareModalProps> = ({ onClose, listInfo, items }) => {
    const [textFormat, setTextFormat] = useState<TextFormat>('formatted');
    const [copyTextButtonState, setCopyTextButtonState] = useState<'idle' | 'copied'>('idle');
    const { showConfirmation } = useModal();
    
    const formattedListText = useMemo(() => {
        const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        const groupedItems = items.reduce((acc, item) => {
          const category = item.category || UNCATEGORIZED;
          if (!acc[category]) { acc[category] = { items: [], subtotal: 0 }; }
          acc[category].items.push(item);
          acc[category].subtotal += item.quantity * item.unitPrice;
          return acc;
        }, {} as Record<string, { items: GroceryItem[], subtotal: number }>);
        const orderedCategories = Object.keys(groupedItems).sort((a, b) => a === UNCATEGORIZED ? 1 : b === UNCATEGORIZED ? -1 : a.localeCompare(b));
        const categoryEmojis: Record<string, string> = { 'BÁSICO': '💡', 'CARNES': '🥩', 'BEBIDAS': '🥤', 'FRIOS': '🧀', 'LATICÍNIOS': '🥛', 'PADARIA': '🍞', 'CEREAIS': '🌾', 'ENLATADOS': '🥫', 'CONDIMENTOS': '🧂', 'HIGIENE': '🧼', 'LIMPEZA': '🧽', 'OUTROS': '🛒' };
        const header = `🛒 *${listInfo.name}*\n\n`;
        const categoriesText = orderedCategories.map(category => {
          const categoryData = groupedItems[category];
          const emoji = categoryEmojis[category] || '📦';
          const categoryHeader = `*--- ${emoji} ${category} ---* (${formatCurrency(categoryData.subtotal)})\n`;
          const itemsText = categoryData.items.map(item => `${item.checked ? '✅' : '⬜️'} ${item.name} (x${item.quantity}) - ${formatCurrency(item.quantity * item.unitPrice)}`).join('\n');
          return categoryHeader + itemsText;
        }).join('\n\n');
        const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const footer = `\n\n*💰 Total Geral: ${formatCurrency(totalPrice)}*`;
        return header + categoriesText + footer;
    }, [items, listInfo.name]);
    
    const jsonListText = useMemo(() => {
        const itemsForExport = items.map(({ id, ...rest }) => rest);
        return JSON.stringify(itemsForExport, null, 2);
    }, [items]);

    const csvListText = useMemo(() => {
        const rows = items.map(item =>
            [item.name, item.quantity, item.unitPrice, item.category || '', item.checked].join(',')
        ).join('\n');
        return rows;
    }, [items]);
    
    const textToDisplay = useMemo(() => {
        switch(textFormat) {
            case 'json': return jsonListText;
            case 'csv': return csvListText;
            default: return formattedListText;
        }
    }, [textFormat, formattedListText, jsonListText, csvListText]);
    
    const whatsappShareText = useMemo(() => encodeURIComponent(formattedListText), [formattedListText]);

    const handleCopyText = () => {
        navigator.clipboard.writeText(textToDisplay).then(() => {
            setCopyTextButtonState('copied');
            setTimeout(() => setCopyTextButtonState('idle'), 2000);
        }, (err) => {
            console.error('Failed to copy text: ', err);
            showConfirmation({
                title: "Falha ao Copiar",
                message: "Não foi possível copiar o texto. Por favor, copie manualmente.",
                confirmText: "OK",
                cancelText: null,
                variant: 'danger'
            });
        });
    };

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
                <header className="flex items-center justify-between p-4 flex-shrink-0 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Compartilhar Lista como Texto</h2>
                    <button onClick={onClose} className="p-3 -m-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                        <CloseIcon />
                    </button>
                </header>
                
                <>
                    <main className="p-4 sm:p-6 space-y-4 flex-grow flex flex-col">
                        <div className="flex-shrink-0 flex items-center justify-between">
                            <p className="text-gray-300 text-sm">
                                Selecione um formato para copiar e compartilhar.
                            </p>
                            <div className="bg-gray-900/50 p-1 rounded-lg flex items-center gap-1 border border-white/10">
                                <FormatTabButton isActive={textFormat === 'formatted'} onClick={() => setTextFormat('formatted')}>Formatado</FormatTabButton>
                                <FormatTabButton isActive={textFormat === 'json'} onClick={() => setTextFormat('json')}>JSON</FormatTabButton>
                                <FormatTabButton isActive={textFormat === 'csv'} onClick={() => setTextFormat('csv')}>CSV</FormatTabButton>
                            </div>
                        </div>
                        <div className="relative flex-grow min-h-[256px]">
                            <div className="absolute inset-0 bg-gray-900/50 p-4 rounded-md border border-white/10 overflow-auto">
                                <pre className="text-white text-sm whitespace-pre-wrap font-sans">{textToDisplay}</pre>
                            </div>
                            <div className="absolute top-2 right-2">
                                <button 
                                    onClick={handleCopyText}
                                    className="p-2 flex items-center gap-2 text-gray-300 bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-white/20 hover:text-white transition-all text-sm font-medium"
                                    aria-label="Copiar Lista"
                                    disabled={copyTextButtonState === 'copied'}
                                >
                                    <AnimatePresence mode="wait">
                                        {copyTextButtonState === 'copied' ? (
                                            <motion.span key="copied" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-1.5 px-1 text-green-400">
                                                <CheckIcon className="w-4 h-4" /> Copiado!
                                            </motion.span>
                                        ) : (
                                            <motion.div key="copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                                                <CopyIcon className="w-5 h-5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>
                    </main>
                    <footer className="flex items-center justify-end p-4 mt-auto border-t border-white/10 flex-shrink-0">
                        {textFormat === 'formatted' ? (
                            <a 
                                href={`https://wa.me/?text=${whatsappShareText}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full px-4 py-3 font-semibold text-white bg-green-600 hover:bg-green-500 rounded-md transition-colors flex items-center justify-center gap-2 text-base"
                                aria-label="Compartilhar no WhatsApp"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
                                <span>Compartilhar no WhatsApp</span>
                            </a>
                        ) : (
                            <button
                                onClick={handleCopyText}
                                className="w-full px-4 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center justify-center gap-2 text-base"
                                aria-label={`Copiar como ${textFormat.toUpperCase()}`}
                            >
                                <CopyIcon className="w-5 h-5" />
                                Copiar {textFormat.toUpperCase()}
                            </button>
                        )}
                    </footer>
                </>

            </motion.div>
        </motion.div>
    );
};