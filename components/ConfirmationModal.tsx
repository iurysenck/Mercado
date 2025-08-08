
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, AlertTriangleIcon, InfoIcon, CheckCircleIcon } from './IconComponents';

export interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: React.ReactNode;
    confirmText?: string;
    cancelText?: string | null;
    variant?: 'danger' | 'info' | 'success';
}

const ICONS: Record<string, React.ReactNode> = {
    danger: <AlertTriangleIcon className="w-8 h-8 text-red-400" />,
    info: <InfoIcon className="w-8 h-8 text-blue-400" />,
    success: <CheckCircleIcon className="w-8 h-8 text-green-400" />,
};

const BUTTON_CLASSES: Record<string, string> = {
    danger: 'bg-red-600 hover:bg-red-500',
    info: 'bg-blue-600 hover:bg-blue-500',
    success: 'bg-green-600 hover:bg-green-500',
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'info'
}) => {
    const icon = ICONS[variant] || ICONS['info'];
    const buttonClass = BUTTON_CLASSES[variant] || BUTTON_CLASSES['info'];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                        className="bg-gray-800/60 backdrop-blur-xl border border-white/10 w-full max-w-md rounded-2xl flex flex-col shadow-2xl m-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="flex items-center justify-between p-4 flex-shrink-0">
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                            <button onClick={onClose} className="p-3 -m-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                                <CloseIcon />
                            </button>
                        </header>
                        <main className="p-6 flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                {icon}
                            </div>
                            <div className="text-gray-300 text-sm">
                                {message}
                            </div>
                        </main>
                        <footer className="flex justify-end items-center p-4 bg-gray-900/30 rounded-b-2xl flex-shrink-0 gap-3">
                             {cancelText && (
                                <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-300 bg-white/5 hover:bg-white/10 rounded-md transition-colors">
                                    {cancelText}
                                </button>
                             )}
                            <button onClick={onConfirm} className={`px-5 py-2.5 text-sm font-semibold text-white ${buttonClass} rounded-md transition-colors`}>
                                {confirmText}
                            </button>
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
