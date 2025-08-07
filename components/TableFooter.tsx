import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GroceryItem, FunnyMessage } from '../types';
import { FUNNY_MESSAGES } from '../constants';
import { BroomIcon, ArrowUturnLeftIcon } from './IconComponents';

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
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-white/10 enabled:hover:text-white"
            {...props}
        >
            {children}
            <span>{label}</span>
        </button>
    );

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-950/70 backdrop-blur-lg border-t border-white/10 p-3 z-20">
            <div className="max-w-2xl mx-auto grid grid-cols-3 items-center text-sm font-medium text-gray-300 px-1">
                <div className="flex items-center gap-1 justify-start">
                     <ActionButton
                        onClick={onClearChecked}
                        disabled={!hasCheckedItems}
                        aria-label="Limpar itens comprados"
                        title="Limpar Comprados"
                        label="Limpar Comprados"
                    >
                        <BroomIcon className="w-4 h-4"/>
                    </ActionButton>
                     <ActionButton
                        onClick={onUncheckAll}
                        disabled={!hasCheckedItems}
                        aria-label="Devolver itens para a lista"
                        title="Desmarcar Todos"
                        label="Desmarcar Todos"
                    >
                       <ArrowUturnLeftIcon className="w-4 h-4"/>
                    </ActionButton>
                </div>

                <div 
                    className="text-center cursor-pointer min-h-[40px] flex items-center justify-center px-2"
                    onClick={() => setFunnyMessage(null)}
                >
                    <AnimatePresence>
                        {funnyMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                            >
                                <p className="font-serif italic text-base md:text-lg text-white">
                                    "{funnyMessage.quote}"
                                </p>
                                <p className="text-xs text-gray-400 mt-1 font-sans not-italic">
                                    - {funnyMessage.author.name} <span className="text-gray-500">({funnyMessage.author.description})</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                <div className="flex flex-col items-end justify-self-end">
                    <div className="flex items-baseline gap-3 text-right">
                        <span className="text-xs text-gray-400">ITENS: <span className="font-bold text-gray-200 tabular-nums">{totalCount}</span></span>
                        <span className="text-lg font-bold text-white tabular-nums">{formatCurrency(totalPrice)}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};