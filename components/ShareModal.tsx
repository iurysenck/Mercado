
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, CopyIcon, ShareIcon, UploadIcon, WhatsAppIcon, CheckIcon } from './IconComponents';
import { GroceryItem, GroceryListInfo } from '../types';
import { UNCATEGORIZED } from '../constants';

type Tab = 'sync' | 'text';

interface ShareModalProps {
    onClose: () => void;
    listInfo: GroceryListInfo;
    items: GroceryItem[];
    onPublish: () => Promise<void>;
}

const TabButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-3 text-sm font-semibold rounded-t-lg transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
            isActive 
            ? 'bg-gray-700/50 text-white' 
            : 'text-gray-400 hover:bg-gray-700/20 hover:text-gray-200'
        }`}
    >
        {children}
    </button>
);


export const ShareModal: React.FC<ShareModalProps> = ({ onClose, listInfo, items, onPublish }) => {
    const [activeTab, setActiveTab] = useState<Tab>(listInfo.source === 'local' ? 'text' : 'sync');
    const [isPublishing, setIsPublishing] = useState(false);
    const [copyLinkButtonText, setCopyLinkButtonText] = useState('Copiar Link');
    const [copyTextButtonState, setCopyTextButtonState] = useState<'idle' | 'copied'>('idle');
    
    const shareUrl = listInfo.source === 'cloud' ? `${window.location.origin}${window.location.pathname}#/list/${listInfo.id}` : '';
    const whatsappText = encodeURIComponent(`Vamos fazer compras juntos! Aqui está o link para a lista "${listInfo.name}": ${shareUrl}`);

    const handleCopyLink = () => {
        if (!shareUrl) return;
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopyLinkButtonText('Copiado!');
            setTimeout(() => setCopyLinkButtonText('Copiar Link'), 2000);
        }, (err) => {
            console.error('Failed to copy URL: ', err);
            setCopyLinkButtonText('Erro!');
            alert('Falha ao copiar. Por favor, copie o link manualmente.');
        });
    };

    const handleShare = async () => {
        if (!shareUrl) return;
        const shareData = {
            title: `Lista de Compras: ${listInfo.name}`,
            text: `Vamos fazer compras juntos! Aqui está o link para a lista "${listInfo.name}".`,
            url: shareUrl,
        };
        try {
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                handleCopyLink();
                alert("Link copiado! A função de compartilhamento nativo não está disponível neste navegador.");
            }
        } catch (err) { console.error("Error sharing", err); }
    };
    
    const handlePublishClick = async () => {
        setIsPublishing(true);
        try {
            await onPublish();
            // The modal will be closed by the parent component after successful navigation
        } catch (e) {
            // Error toast is shown by parent
        } finally {
            setIsPublishing(false);
        }
    }

    const formattedListText = useMemo(() => {
        const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

        const groupedItems = items.reduce((acc, item) => {
          const category = item.category || UNCATEGORIZED;
          if (!acc[category]) {
            acc[category] = { items: [], subtotal: 0 };
          }
          acc[category].items.push(item);
          acc[category].subtotal += item.quantity * item.unitPrice;
          return acc;
        }, {} as Record<string, { items: GroceryItem[], subtotal: number }>);

        const orderedCategories = Object.keys(groupedItems).sort((a, b) => 
          a === UNCATEGORIZED ? 1 : b === UNCATEGORIZED ? -1 : a.localeCompare(b)
        );

        const categoryEmojis: Record<string, string> = {
          'BÁSICO': '💡', 'CARNES': '🥩', 'BEBIDAS': '🥤', 'FRIOS': '🧀',
          'LATICÍNIOS': '🥛', 'PADARIA': '🍞', 'CEREAIS': '🌾', 'ENLATADOS': '🥫',
          'CONDIMENTOS': '🧂', 'HIGIENE': '🧼', 'LIMPEZA': '🧽', 'OUTROS': '🛒'
        };
        
        const header = `🛒 *${listInfo.name}*\n\n`;

        const categoriesText = orderedCategories.map(category => {
          const categoryData = groupedItems[category];
          const emoji = categoryEmojis[category] || '📦';
          const categoryHeader = `*--- ${emoji} ${category} ---* (${formatCurrency(categoryData.subtotal)})\n`;
          
          const itemsText = categoryData.items.map(item => {
            const check = item.checked ? '✅' : '⬜️';
            const itemTotal = item.quantity * item.unitPrice;
            return `${check} ${item.name} (x${item.quantity}) - ${formatCurrency(itemTotal)}`;
          }).join('\n');

          return categoryHeader + itemsText;
        }).join('\n\n');

        const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const footer = `\n\n*💰 Total Geral: ${formatCurrency(totalPrice)}*`;

        return header + categoriesText + footer;
      }, [items, listInfo.name]);

    const whatsappShareText = useMemo(() => encodeURIComponent(formattedListText), [formattedListText]);

    const handleCopyText = () => {
        navigator.clipboard.writeText(formattedListText).then(() => {
            setCopyTextButtonState('copied');
            setTimeout(() => setCopyTextButtonState('idle'), 2000);
        }, (err) => {
            console.error('Failed to copy text: ', err);
            alert('Falha ao copiar. Por favor, copie o texto manualmente.');
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
                <header className="flex items-center justify-between p-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Compartilhar Lista</h2>
                    <button onClick={onClose} className="p-3 -m-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                        <CloseIcon />
                    </button>
                </header>

                <div className="flex px-4 border-b border-white/10">
                    <TabButton isActive={activeTab === 'sync'} onClick={() => setActiveTab('sync')}>Sincronização Real</TabButton>
                    <TabButton isActive={activeTab === 'text'} onClick={() => setActiveTab('text')}>Copiar como Texto</TabButton>
                </div>
                
                {activeTab === 'sync' && (
                    listInfo.source === 'cloud' ? (
                    <>
                        <main className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                            <p className="text-gray-300">Qualquer pessoa com este link poderá ver e editar esta lista em tempo real.</p>
                            <div>
                                <label htmlFor="share-url" className="block text-sm font-medium text-gray-300 mb-1">Link da Lista</label>
                                <input
                                    id="share-url" type="text" readOnly value={shareUrl}
                                    className="w-full bg-gray-900/50 border-2 border-white/10 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onClick={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </main>
                        <footer className="flex flex-col items-center justify-end gap-3 p-4 mt-auto border-t border-white/10 flex-shrink-0">
                            <button onClick={handleShare} className="w-full px-4 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center justify-center gap-2 text-base">
                                <ShareIcon className="w-5 h-5" /> <span>Compartilhar com Link</span>
                            </button>
                            <div className="flex w-full items-center gap-3">
                                <a href={`https://wa.me/?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-3 text-sm font-semibold text-center text-green-300 bg-green-500/20 hover:bg-green-500/30 rounded-md transition-colors flex items-center justify-center gap-2">
                                    <WhatsAppIcon className="w-5 h-5" /> WhatsApp
                                </a>
                                <button onClick={handleCopyLink} className="flex-1 px-4 py-3 text-sm font-semibold text-center text-gray-300 bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center justify-center gap-2">
                                    <CopyIcon className="w-5 h-5" /> {copyLinkButtonText}
                                </button>
                            </div>
                        </footer>
                    </>
                    ) : (
                    <main className="p-4 sm:p-6 space-y-4 text-center flex-grow flex flex-col items-center justify-center">
                        <p className="text-gray-300">Esta é uma lista local. Para compartilhar em tempo real, publique-a online.</p>
                        <p className="text-sm text-gray-400">Ao publicar, a lista será movida para a nuvem e você receberá um link compartilhável.</p>
                        <button 
                            onClick={handlePublishClick}
                            disabled={isPublishing}
                            className="mt-4 w-full sm:w-auto px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center justify-center gap-2 disabled:bg-blue-800 disabled:cursor-wait"
                        >
                            <UploadIcon className="w-5 h-5" />
                            {isPublishing ? 'Publicando...' : 'Publicar e Gerar Link'}
                        </button>
                    </main>
                    )
                )}

                {activeTab === 'text' && (
                    <>
                        <main className="p-4 sm:p-6 space-y-4 flex-grow flex flex-col">
                            <p className="text-gray-300 text-sm flex-shrink-0">
                                Uma prévia de como sua lista será copiada. Perfeito para compartilhar no WhatsApp ou em qualquer outro lugar.
                            </p>
                            <div className="relative flex-grow min-h-[256px]">
                                <div className="absolute inset-0 bg-gray-900/50 p-4 rounded-md border border-white/10 overflow-auto">
                                    <pre className="text-white text-sm whitespace-pre-wrap font-sans">{formattedListText}</pre>
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
                        </footer>
                    </>
                )}

            </motion.div>
        </motion.div>
    );
};