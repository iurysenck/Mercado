
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, CheckBadgeIcon } from './IconComponents';

interface TotalFooterProps {
    totalPrice: number;
    itemCount: number;
    onAddItem: () => void;
    onEnterSelectionMode: () => void;
}

export const TotalFooter: React.FC<TotalFooterProps> = ({ totalPrice, itemCount, onAddItem, onEnterSelectionMode }) => {
    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-950/70 backdrop-blur-lg border-t border-white/10 z-20"
        >
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <AnimatePresence>
                    {itemCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                        >
                            <p className="text-sm text-gray-300 font-medium">
                                Total ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
                            </p>
                            <p className="text-lg font-bold text-white tabular-nums">
                                {formatCurrency(totalPrice)}
                            </p>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                     <AnimatePresence>
                        {itemCount > 0 && (
                             <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                             >
                                <button
                                    onClick={onEnterSelectionMode}
                                    className="p-3 text-gray-300 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="Entrar no modo de seleção"
                                >
                                    <CheckBadgeIcon className="w-6 h-6" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={onAddItem}
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                        aria-label="Adicionar novo item"
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
