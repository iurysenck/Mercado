import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrashIcon, ExclamationTriangleIcon, CheckIcon } from './IconComponents';

interface AdvancedOptionsModalProps {
    onClose: () => void;
    onResetApp: () => void;
}

export const AdvancedOptionsModal: React.FC<AdvancedOptionsModalProps> = ({ onClose, onResetApp }) => {
    const [showResetConfirmation, setShowResetConfirmation] = useState(false);
    const [resetConfirmed, setResetConfirmed] = useState(false);

    const handleResetApp = () => {
        if (resetConfirmed) {
            onResetApp();
            onClose();
        } else {
            setShowResetConfirmation(true);
        }
    };

    const confirmReset = () => {
        setResetConfirmed(true);
        setTimeout(() => {
            handleResetApp();
        }, 1000);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-lg p-6 w-full max-w-md mx-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Opções Avançadas</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Seção de Reset */}
                        <div className="border border-red-500/20 rounded-lg p-4 bg-red-500/5">
                            <div className="flex items-center gap-3 mb-3">
                                <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                                <h3 className="text-lg font-semibold text-white">Reset Completo</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">
                                Esta ação irá apagar todos os dados do aplicativo, incluindo todas as listas, 
                                histórico e configurações. Esta ação não pode ser desfeita.
                            </p>
                            
                            {!showResetConfirmation ? (
                                <button
                                    onClick={() => setShowResetConfirmation(true)}
                                    className="w-full px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                    Reset Completo do App
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                                        <p className="text-red-300 text-sm font-medium">
                                            ⚠️ Tem certeza que deseja apagar todos os dados?
                                        </p>
                                    </div>
                                    
                                    {!resetConfirmed ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={confirmReset}
                                                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                                Sim, Apagar Tudo
                                            </button>
                                            <button
                                                onClick={() => setShowResetConfirmation(false)}
                                                className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 text-green-400">
                                            <CheckIcon className="w-5 h-5" />
                                            <span className="font-medium">Resetando...</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Informações do App */}
                        <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                            <h3 className="text-lg font-semibold text-white mb-3">Informações do App</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex justify-between">
                                    <span>Versão:</span>
                                    <span className="text-white">1.0.0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Dados salvos:</span>
                                    <span className="text-white">Local Storage</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Backup:</span>
                                    <span className="text-white">Automático</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}; 