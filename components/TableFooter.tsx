import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GroceryItem, FunnyMessage } from '../types';
import { FUNNY_MESSAGES } from '../constants';
import { BroomIcon, ArrowUturnLeftIcon, XMarkIcon } from './IconComponents';

interface SummaryFooterProps {
    items: GroceryItem[];
    onClearChecked: () => void;
    onUncheckAll: () => void;
}

export const SummaryFooter: React.FC<SummaryFooterProps> = ({ items, onClearChecked, onUncheckAll }) => {
    const [funnyMessage, setFunnyMessage] = useState<FunnyMessage | null>(null);

    const { totalCount, totalPrice, hasCheckedItems } = useMemo(() => {
        const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        return {
            totalCount: items.length,
            totalPrice: total,
            hasCheckedItems: items.some(item => item.checked),
        };
    }, [items]);
    
    const prevTotalPriceRef = useRef(totalPrice);

    // This effect determines if a message should be shown or hidden based on price
    useEffect(() => {
        if (totalPrice > 400 && prevTotalPriceRef.current <= 400) {
            // Crossed the threshold upwards, show a new message
            const randomIndex = Math.floor(Math.random() * FUNNY_MESSAGES.length);
            setFunnyMessage(FUNNY_MESSAGES[randomIndex]);
        } else if (totalPrice <= 400) {
            // Dropped below or is at threshold, hide message
            setFunnyMessage(null);
        }
        // Always update the ref to the current price for the next render
        prevTotalPriceRef.current = totalPrice;
    }, [totalPrice]);

    // This effect handles the self-dismiss timer for the message
    useEffect(() => {
        if (funnyMessage) {
            const timer = setTimeout(() => {
                setFunnyMessage(null);
            }, 60000); // 1 minute timer
            return () => clearTimeout(timer);
        }
    }, [funnyMessage]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const ActionButton: React.FC<{onClick: () => void; disabled: boolean; children: React.ReactNode; label: string; 'aria-label': string; title: string;}> = 
    ({ onClick, disabled, children, label, ...props }) => (
         <button
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-gray-300 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-white/10 enabled:hover:text-white enabled:hover:scale-105 active:scale-95"
            {...props}
        >
            {children}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <>
            {/* Mensagem engraçada acima do footer */}
            <AnimatePresence>
                {funnyMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-30 max-w-sm mx-4"
                    >
                        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-2xl relative">
                            <button
                                onClick={() => setFunnyMessage(null)}
                                className="absolute -top-2 -right-2 p-1 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors"
                                aria-label="Fechar mensagem"
                            >
                                <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                            <div className="text-center">
                                <p className="font-serif italic text-sm md:text-base text-white leading-tight mb-2">
                                    "{funnyMessage.quote}"
                                </p>
                                <p className="text-xs text-gray-400 font-sans not-italic">
                                    - {funnyMessage.author.name} <span className="text-gray-500">({funnyMessage.author.description})</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-xl border-t border-white/10 p-2 z-20">
                <div className="max-w-2xl mx-auto grid grid-cols-2 items-center text-sm font-medium text-gray-300 px-1">
                    <div className="flex items-center gap-1 justify-start">
                         <ActionButton
                            onClick={onClearChecked}
                            disabled={!hasCheckedItems}
                            aria-label="Limpar itens comprados"
                            title="Limpar Comprados"
                            label="Limpar"
                        >
                            <BroomIcon className="w-3.5 h-3.5"/>
                        </ActionButton>
                         <ActionButton
                            onClick={onUncheckAll}
                            disabled={!hasCheckedItems}
                            aria-label="Devolver itens para a lista"
                            title="Desmarcar Todos"
                            label="Desmarcar"
                        >
                           <ArrowUturnLeftIcon className="w-3.5 h-3.5"/>
                        </ActionButton>
                    </div>
                    
                    <div className="flex flex-col items-end justify-self-end">
                        <div className="flex items-baseline gap-2 text-right">
                            <span className="text-xs text-gray-400">ITENS: <span className="font-bold text-gray-200 tabular-nums">{totalCount}</span></span>
                            <span className="text-base font-bold text-white tabular-nums">{formatCurrency(totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};