import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, SearchIcon } from './IconComponents';

interface EmptyStateProps {
    isSearchResult?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isSearchResult }) => {
    if (isSearchResult) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-20 px-4"
            >
                <div className="inline-block bg-white/5 backdrop-blur-md p-5 rounded-full">
                    <SearchIcon className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Nenhum item encontrado</h3>
                <p className="mt-2 text-base text-gray-400">Tente usar outros termos de busca ou ajuste os filtros de categoria.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-20 px-4"
        >
            <div className="inline-block bg-white/5 backdrop-blur-md p-5 rounded-full">
                <ShoppingCartIcon className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">Sua lista está vazia</h3>
            <p className="mt-2 text-base text-gray-400">Toque no botão <span className="font-bold text-blue-400">+</span> para adicionar seu primeiro item.</p>
        </motion.div>
    );
};