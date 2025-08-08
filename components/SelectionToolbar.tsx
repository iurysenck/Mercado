
import React from 'react';
import { motion } from 'framer-motion';
import { CloseIcon, TrashIcon, CheckCircleIcon, ArrowUturnLeftIcon, BroomIcon } from './IconComponents';

interface SelectionToolbarProps {
    selectedCount: number;
    totalCount: number;
    onClose: () => void;
    onDelete: () => void;
    onCheck: (checkState: boolean) => void;
    onZeroPrice: () => void;
    onSelectAll: () => void;
}

export const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
    selectedCount,
    totalCount,
    onClose,
    onDelete,
    onCheck,
    onZeroPrice,
    onSelectAll
}) => {

    const ActionButton: React.FC<{
        onClick: () => void;
        disabled: boolean;
        children: React.ReactNode;
        'aria-label': string;
        className?: string;
    }> = ({ onClick, disabled, children, ...props }) => (
         <button
            onClick={onClick}
            disabled={disabled}
            className={`flex flex-col items-center justify-center text-center gap-1 p-3 rounded-lg text-xs font-medium text-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-white/10 enabled:hover:text-white ${props.className || ''}`}
            aria-label={props['aria-label']}
        >
            {children}
        </button>
    );

    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-950/70 backdrop-blur-lg border-t border-white/10 z-20"
        >
            <div className="max-w-2xl mx-auto p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-3 text-gray-300 hover:bg-white/10 rounded-full">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                    <div>
                        <p className="font-bold text-white text-lg">{selectedCount} selecionado(s)</p>
                         <button onClick={onSelectAll} className="text-sm font-semibold text-blue-400 hover:text-blue-300">
                            {selectedCount === totalCount ? 'Desselecionar todos' : 'Selecionar todos'}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ActionButton onClick={() => onCheck(true)} disabled={selectedCount === 0} aria-label="Marcar selecionados como comprados">
                        <CheckCircleIcon className="w-6 h-6 text-green-400" />
                        <span>Comprado</span>
                    </ActionButton>
                     <ActionButton onClick={() => onCheck(false)} disabled={selectedCount === 0} aria-label="Marcar selecionados como pendentes">
                        <ArrowUturnLeftIcon className="w-6 h-6 text-yellow-400" />
                        <span>Pendente</span>
                    </ActionButton>
                    <ActionButton onClick={onZeroPrice} disabled={selectedCount === 0} aria-label="Zerar preço dos selecionados">
                        <BroomIcon className="w-6 h-6 text-purple-400" />
                        <span>Zerar Preço</span>
                    </ActionButton>
                    <ActionButton onClick={onDelete} disabled={selectedCount === 0} aria-label="Excluir selecionados" className="text-red-400">
                        <TrashIcon className="w-6 h-6" />
                         <span>Excluir</span>
                    </ActionButton>
                </div>
            </div>
        </motion.div>
    );
};
