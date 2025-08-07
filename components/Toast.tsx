import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ToastProps {
    message: string;
    onUndo: () => void;
    onDismiss: () => void;
    canUndo?: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, onUndo, onDismiss, canUndo }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [onDismiss]);

    return (
        <motion.div
            layout
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="bg-gray-900/60 backdrop-blur-md border border-white/10 text-white rounded-full shadow-lg flex items-center justify-between p-1.5 pl-4">
                <span className="text-sm font-medium mr-4">{message}</span>
                {canUndo && (
                    <button
                        onClick={onUndo}
                        className="text-sm font-bold text-blue-300 hover:text-blue-200 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                    >
                        Desfazer
                    </button>
                )}
            </div>
        </motion.div>
    );
};