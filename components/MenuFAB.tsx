
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { EllipsisHorizontalIcon, CloseIcon } from './IconComponents';

interface Action {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
}

interface MenuFABProps {
    actions: Action[];
}

export const MenuFAB: React.FC<MenuFABProps> = ({ actions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const itemVariants: Variants = {
        open: (i: number) => ({
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                type: 'spring',
                stiffness: 300,
                damping: 24
            }
        }),
        closed: {
            y: 20,
            x: 10,
            opacity: 0,
        },
    };

    return (
        <div className="fixed bottom-[104px] right-6 z-30 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="flex flex-col items-end gap-4 mb-4"
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {actions.map((action, i) => (
                            <motion.button
                                key={action.label}
                                onClick={() => {
                                    action.onClick();
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-md rounded-full pl-4 pr-5 py-3 text-white font-semibold shadow-lg hover:bg-gray-700/80"
                                custom={i}
                                variants={itemVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                <span>{action.label}</span>
                                {action.icon}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                onClick={toggleMenu}
                className="relative bg-gray-800 hover:bg-gray-700 text-white rounded-full p-4 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 flex items-center justify-center w-14 h-14"
                aria-label="Abrir menu de ações"
                animate={{ scale: isOpen ? 1.1 : 1 }}
            >
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={isOpen ? "close" : "ellipsis"}
                        initial={{ rotate: -45, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 45, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute"
                    >
                        {isOpen ? <CloseIcon className="w-6 h-6" /> : <EllipsisHorizontalIcon className="w-6 h-6" />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </div>
    );
};