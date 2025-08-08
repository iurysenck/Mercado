
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ToastProps {
    message: string;
    onDismiss: () => void;
    isFunnyMessageVisible?: boolean;
    onUndo?: () => void;
    canUndo?: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss, isFunnyMessageVisible, onUndo, canUndo }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [onDismiss]);

    const handleUndo = () => {
        if(onUndo) {
            onUndo();
        }
        onDismiss();
    }

    const toastPositionClass = isFunnyMessageVisible ? 'bottom-48' : 'bottom-24';

    return (
        <motion.div
            layout
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className={`fixed ${toastPositionClass} inset-x-0 z-50 flex justify-center pointer-events-none`}
        >
            <div className="bg-gray-900/60 backdrop-blur-md border border-white/10 text-white rounded-full shadow-lg flex items-center justify-between py-2 px-4 pointer-events-auto">
                <span className="text-sm font-medium">{message}</span>
                {canUndo && onUndo && (
                    <>
                        <div className="w-px h-4 bg-white/20 mx-3"></div>
                        <button onClick={handleUndo} className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                            Desfazer
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
};
