import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnyMessage } from '../types';

interface FunnyMessageDisplayProps {
    funnyMessage: FunnyMessage | null;
    onClose: () => void;
}

export const FunnyMessageDisplay: React.FC<FunnyMessageDisplayProps> = ({ funnyMessage, onClose }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none" style={{ paddingBottom: '70px' }}>
            <div className="max-w-2xl mx-auto px-4">
                 <AnimatePresence>
                    {funnyMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="pointer-events-auto cursor-pointer"
                            onClick={onClose}
                        >
                            <div className="bg-gray-950/70 backdrop-blur-lg border border-white/10 p-4 rounded-xl shadow-lg overflow-hidden relative">
                                <p className="font-serif italic text-base md:text-lg text-white text-center">
                                    "{funnyMessage.quote}"
                                </p>
                                <p className="text-xs text-gray-400 mt-2 font-sans not-italic text-center">
                                    - {funnyMessage.author.name} <span className="text-gray-500">({funnyMessage.author.description})</span>
                                </p>
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
                                    initial={{ scaleX: 1 }}
                                    animate={{ scaleX: 0 }}
                                    transition={{ duration: 20, ease: 'linear' }}
                                    style={{ transformOrigin: 'left' }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
