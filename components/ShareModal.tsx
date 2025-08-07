import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GroceryListInfo, GroceryItem } from '../types';
import { CloseIcon, CopyIcon, WhatsAppIcon } from './IconComponents';

interface ShareModalProps {
    onClose: () => void;
    lists: GroceryListInfo[];
    activeListId: string;
}

const generateShareableText = (listName: string, items: GroceryItem[]): string => {
    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const pendingItems = items.filter(item => !item.checked);
    const checkedItems = items.filter(item => item.checked);
    const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    let text = `🛒 *${listName}* 🛒\n\n`;

    if (pendingItems.length > 0) {
        text += `*A FAZER* (${pendingItems.length})\n`;
        pendingItems.forEach(item => {
            text += `- [ ] ${item.name || 'Item sem nome'} (${item.quantity} x ${formatCurrency(item.unitPrice)})\n`;
        });
        text += "\n";
    }

    if (checkedItems.length > 0) {
        text += `*COMPRADOS* (${checkedItems.length})\n`;
        checkedItems.forEach(item => {
            text += `- [x] ${item.name || 'Item sem nome'} (${item.quantity} x ${formatCurrency(item.unitPrice)})\n`;
        });
        text += "\n";
    }
    
    if (items.length === 0) {
        text += 'Esta lista está vazia!\n\n'
    }

    text += `--------------------\n`;
    text += `*Total Estimado: ${formatCurrency(total)}*`;

    return text;
};


export const ShareModal: React.FC<ShareModalProps> = ({ onClose, lists, activeListId }) => {
    const [selectedListId, setSelectedListId] = useState<string>(activeListId);
    const [listItems, setListItems] = useState<GroceryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [copyButtonText, setCopyButtonText] = useState('Copiar');
    
    useEffect(() => {
        setIsLoading(true);
        try {
            const historyKey = `grocery-list-history-${selectedListId}`;
            const storedHistory = window.localStorage.getItem(historyKey);
            if(storedHistory){
                const history = JSON.parse(storedHistory);
                const currentItems = history[history.length - 1] || [];
                setListItems(currentItems);
            } else {
                setListItems([]);
            }
        } catch (e) {
            console.error("Failed to load list items for sharing", e);
            setListItems([]);
        } finally {
            setIsLoading(false);
        }
    }, [selectedListId]);
    
    const shareableText = useMemo(() => {
        const listName = lists.find(l => l.id === selectedListId)?.name || 'Lista de Compras';
        return generateShareableText(listName, listItems);
    }, [selectedListId, listItems, lists]);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareableText).then(() => {
            setCopyButtonText('Copiado!');
            setTimeout(() => setCopyButtonText('Copiar'), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setCopyButtonText('Erro!');
            setTimeout(() => setCopyButtonText('Copiar'), 2000);
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
                <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Compartilhar Lista</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                        <CloseIcon />
                    </button>
                </header>
                
                <main className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label htmlFor="list-select" className="block text-sm font-medium text-gray-300 mb-1">Selecione a lista para compartilhar</label>
                        <select
                            id="list-select"
                            value={selectedListId}
                            onChange={(e) => setSelectedListId(e.target.value)}
                            className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {lists.map(list => (
                                <option key={list.id} value={list.id}>{list.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Pré-visualização</label>
                        <div className="bg-gray-900/50 border-2 border-white/10 rounded-md p-4 h-64 overflow-y-auto">
                            {isLoading ? (
                                <p className="text-gray-400">Carregando itens...</p>
                            ) : (
                                <p className="text-white whitespace-pre-wrap font-mono text-sm">{shareableText}</p>
                            )}
                        </div>
                    </div>
                </main>

                <footer className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 mt-auto border-t border-white/10 flex-shrink-0">
                    <button 
                        onClick={handleCopy} 
                        className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-blue-300 bg-blue-500/20 hover:bg-blue-500/30 rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                        <CopyIcon className="w-4 h-4" /> {copyButtonText}
                    </button>
                     <a
                        href={`https://wa.me/?text=${encodeURIComponent(shareableText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-3 font-semibold text-white bg-green-600 hover:bg-green-500 rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        <span>Compartilhar no WhatsApp</span>
                    </a>
                </footer>

            </motion.div>
        </motion.div>
    );
};
