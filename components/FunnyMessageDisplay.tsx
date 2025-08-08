
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnyMessage } from '../types';

interface FunnyMessageDisplayProps {
    funnyMessage: FunnyMessage | null;
    onClose: () => void;
}

export const FunnyMessageDisplay: React.FC<FunnyMessageDisplayProps> = ({ funnyMessage, onClose }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="fixed top-4 md:top-auto md:bottom-0 inset-x-0 z-20 pointer-events-none">
            <div className="max-w-2xl mx-auto px-4">
                 <AnimatePresence>
                    {funnyMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: isMobile ? -20 : 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: isMobile ? -20 : 10, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="pointer-events-auto cursor-pointer"
                            onClick={onClose}
                        >
                            <div className="bg-gray-950/70 backdrop-blur-lg border border-white/10 p-4 rounded-xl shadow-lg overflow-hidden relative md:mb-[70px]">
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
                                    transition={{ duration: 15, ease: 'linear' }}
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