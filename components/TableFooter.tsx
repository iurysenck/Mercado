
import React, { useMemo } from 'react';
import { GroceryItem } from '../types';
import { CheckBadgeIcon } from './IconComponents';

interface SummaryFooterProps {
    items: GroceryItem[];
    onToggleSelectionMode: () => void;
}

export const SummaryFooter: React.FC<SummaryFooterProps> = ({ items, onToggleSelectionMode }) => {
    const { totalCount, totalPrice } = useMemo(() => {
        const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        return {
            totalCount: items.length,
            totalPrice: total
        };
    }, [items]);

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
            <div className="max-w-2xl mx-auto grid grid-cols-2 items-center text-sm font-medium text-gray-300 px-1">
                <div className="flex items-center gap-1 justify-start">
                     <ActionButton
                        onClick={onToggleSelectionMode}
                        disabled={items.length === 0}
                        aria-label="Selecionar Itens"
                        title="Selecionar Itens"
                        label="Selecionar"
                    >
                       <CheckBadgeIcon className="w-4 h-4"/>
                    </ActionButton>
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
