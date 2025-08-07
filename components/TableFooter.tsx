import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GroceryItem, FunnyMessage } from '../types';
import { BroomIcon, ArrowUturnLeftIcon, XMarkIcon } from './IconComponents';

interface SummaryFooterProps {
    items: GroceryItem[];
    onClearChecked: () => void;
    onUncheckAll: () => void;
}

const FUNNY_MESSAGES: FunnyMessage[] = [
    {
        quote: "Parece que você está fazendo uma festa! 🎉",
        author: { name: "Sistema", description: "Detector de Gastos" }
    },
    {
        quote: "Seu carrinho está mais pesado que minhas responsabilidades! 😅",
        author: { name: "Carrinho", description: "Muito Ocupado" }
    },
    {
        quote: "Com essa lista, até o mercado vai ficar impressionado! 🛒",
        author: { name: "Mercado", description: "Sempre Presente" }
    },
    {
        quote: "Você está comprando para um exército ou só para o fim de semana? 🤔",
        author: { name: "Lista", description: "Curiosa" }
    },
    {
        quote: "Compras inteligentes, vida mais leve! ✨",
        author: { name: "Sistema", description: "Otimista" }
    },
    {
        quote: "Seu carrinho está mais organizado que minha vida! 📝",
        author: { name: "Organização", description: "Admiradora" }
    },
    {
        quote: "Parece que você tem um plano! (Ou vários planos) 📋",
        author: { name: "Planejamento", description: "Estrategista" }
    },
    {
        quote: "Com essa lista, você vai precisar de um carrinho extra! 🛒",
        author: { name: "Carrinho", description: "Preocupado" }
    },
    {
        quote: "Você está comprando para o mês inteiro ou para o ano? 📅",
        author: { name: "Tempo", description: "Confuso" }
    },
    {
        quote: "Lista de compras nível: PROFISSIONAL! 🏆",
        author: { name: "Sistema", description: "Impressionado" }
    },
    {
        quote: "Seu carrinho está mais completo que um dicionário! 📚",
        author: { name: "Educação", description: "Comparativa" }
    },
    {
        quote: "Parece que você não vai passar fome! 🍽️",
        author: { name: "Fome", description: "Aliviada" }
    },
    {
        quote: "Com essa lista, até o caixa vai ficar cansado! 💳",
        author: { name: "Caixa", description: "Antecipadamente Cansado" }
    },
    {
        quote: "Você está preparando para um apocalipse ou só para o fim de semana? 🌍",
        author: { name: "Sobrevivência", description: "Preparada" }
    },
    {
        quote: "Lista de compras: Edição ESPECIAL! ⭐",
        author: { name: "Edição", description: "Especial" }
    }
];

export const SummaryFooter: React.FC<SummaryFooterProps> = ({ items, onClearChecked, onUncheckAll }) => {
    const [funnyMessage, setFunnyMessage] = useState<FunnyMessage | null>(null);
    const [lastMessageThreshold, setLastMessageThreshold] = useState<number>(0);
    const [usedMessages, setUsedMessages] = useState<Set<number>>(new Set());

    const { totalCount, totalPrice, hasCheckedItems } = useMemo(() => {
        const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        return {
            totalCount: items.length,
            totalPrice: total,
            hasCheckedItems: items.some(item => item.checked),
        };
    }, [items]);
    
    const prevTotalPriceRef = useRef(totalPrice);

    // Função para obter uma mensagem aleatória que ainda não foi usada
    const getRandomUnusedMessage = () => {
        const availableMessages = FUNNY_MESSAGES.filter((_, index) => !usedMessages.has(index));
        
        // Se todas as mensagens foram usadas, resetar o conjunto
        if (availableMessages.length === 0) {
            setUsedMessages(new Set());
            return FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
        }
        
        // Escolher uma mensagem aleatória das não usadas
        const randomIndex = Math.floor(Math.random() * availableMessages.length);
        const selectedMessage = availableMessages[randomIndex];
        const selectedIndex = FUNNY_MESSAGES.indexOf(selectedMessage);
        
        // Marcar como usada
        setUsedMessages(prev => new Set([...prev, selectedIndex]));
        
        return selectedMessage;
    };

    // This effect determines if a message should be shown based on price thresholds
    useEffect(() => {
        const THRESHOLD_START = 300; // R$ 300
        const THRESHOLD_INCREMENT = 100; // R$ 100
        
        if (totalPrice >= THRESHOLD_START) {
            // Calculate the current threshold level
            const currentThreshold = Math.floor((totalPrice - THRESHOLD_START) / THRESHOLD_INCREMENT) * THRESHOLD_INCREMENT + THRESHOLD_START;
            
            // Check if we crossed a new threshold
            if (currentThreshold > lastMessageThreshold && totalPrice > prevTotalPriceRef.current) {
                // Show a new random message that hasn't been used recently
                const newMessage = getRandomUnusedMessage();
                setFunnyMessage(newMessage);
                setLastMessageThreshold(currentThreshold);
            }
        } else {
            // Below threshold, hide message and reset threshold
            setFunnyMessage(null);
            setLastMessageThreshold(0);
        }
        
        // Always update the ref to the current price for the next render
        prevTotalPriceRef.current = totalPrice;
    }, [totalPrice, lastMessageThreshold, usedMessages]);

    // Auto-dismiss timer
    useEffect(() => {
        if (funnyMessage) {
            const timer = setTimeout(() => {
                setFunnyMessage(null);
            }, 8000); // 8 seconds

            return () => clearTimeout(timer);
        }
    }, [funnyMessage]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const ActionButton: React.FC<{
        onClick: () => void;
        disabled: boolean;
        children: React.ReactNode;
        'aria-label': string;
        title: string;
        label: string;
    }> = ({ onClick, disabled, children, 'aria-label': ariaLabel, title, label }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            title={title}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1.5 ${
                disabled
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/20'
            }`}
        >
            {children}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <>
            {/* Mensagem engraçada acima do footer */}
            <AnimatePresence>
                {funnyMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-30 max-w-sm mx-4"
                    >
                        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-2xl relative">
                            <button
                                onClick={() => setFunnyMessage(null)}
                                className="absolute -top-2 -right-2 p-1 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors"
                                aria-label="Fechar mensagem"
                            >
                                <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                            <div className="text-center">
                                <p className="font-serif italic text-sm md:text-base text-white leading-tight mb-2">
                                    "{funnyMessage.quote}"
                                </p>
                                <p className="text-xs text-gray-400 font-sans not-italic">
                                    - {funnyMessage.author.name} <span className="text-gray-500">({funnyMessage.author.description})</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-xl border-t border-white/10 p-2 z-20">
                <div className="max-w-2xl mx-auto grid grid-cols-2 items-center text-sm font-medium text-gray-300 px-1">
                    <div className="flex items-center gap-1 justify-start">
                         <ActionButton
                            onClick={onClearChecked}
                            disabled={!hasCheckedItems}
                            aria-label="Limpar itens comprados"
                            title="Limpar Comprados"
                            label="Limpar"
                        >
                            <BroomIcon className="w-3.5 h-3.5"/>
                        </ActionButton>
                         <ActionButton
                            onClick={onUncheckAll}
                            disabled={!hasCheckedItems}
                            aria-label="Devolver itens para a lista"
                            title="Desmarcar Todos"
                            label="Desmarcar"
                        >
                           <ArrowUturnLeftIcon className="w-3.5 h-3.5"/>
                        </ActionButton>
                    </div>
                    
                    <div className="flex flex-col items-end justify-self-end">
                        <div className="flex items-baseline gap-2 text-right">
                            <span className="text-xs text-gray-400">ITENS: <span className="font-bold text-gray-200 tabular-nums">{totalCount}</span></span>
                            <span className="text-base font-bold text-white tabular-nums">{formatCurrency(totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};