import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GroceryItem, Category } from '../types';
import { CloseIcon, UploadIcon, PasteIcon } from './IconComponents';

interface ImportModalProps {
    onClose: () => void;
    onImport: (items: GroceryItem[]) => void;
}

type Tab = 'text' | 'json' | 'csv';

const PLACEHOLDERS: Record<Tab, string> = {
    text: "Arroz\nFeijão\nMacarrão",
    json: `[
  {
    "name": "Leite Integral",
    "quantity": 2,
    "unitPrice": 5.50,
    "category": "LATICÍNIOS",
    "checked": false
  },
  {
    "name": "Café em Pó",
    "quantity": 1,
    "unitPrice": 12.00,
    "category": "BÁSICO",
    "checked": true
  }
]`,
    csv: "Pão de Forma,1,8.99,PADARIA,false\nDetergente,2,2.50,LIMPEZA,true\nSabonete,3,1.99,HIGIENE,false",
};


export const ImportModal: React.FC<ImportModalProps> = ({ onClose, onImport }) => {
    const [activeTab, setActiveTab] = useState<Tab>('text');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleImport = () => {
        setError(null);
        if (!inputValue.trim()) {
            onClose();
            return;
        }
        try {
            let newItems: GroceryItem[] = [];
            
            if (activeTab === 'text') {
                newItems = inputValue.split('\n')
                    .map(name => name.trim())
                    .filter(name => name)
                    .map(name => ({ 
                        id: crypto.randomUUID(),
                        name,
                        checked: false,
                        quantity: 1,
                        unitPrice: 0,
                        category: null,
                     }));
            } else if (activeTab === 'json') {
                const data = JSON.parse(inputValue);
                if (!Array.isArray(data)) throw new Error("O JSON deve ser um array de objetos.");
                newItems = data.map((item: any) => {
                    if (!item.name || typeof item.name !== 'string') throw new Error("Cada objeto no JSON deve ter uma propriedade 'name' do tipo texto.");
                    const validCategory = Object.values(Category).find(c => c === item.category);
                    return {
                        id: crypto.randomUUID(),
                        name: item.name,
                        checked: !!item.checked,
                        quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
                        unitPrice: typeof item.unitPrice === 'number' && item.unitPrice >= 0 ? item.unitPrice : 0,
                        category: validCategory || null,
                    };
                });
            } else if (activeTab === 'csv') {
                newItems = inputValue.split('\n')
                    .map(line => line.trim())
                    .filter(line => line)
                    .map(line => {
                        const [name, quantity, unitPrice, category, checked] = line.split(',');
                        const validCategory = Object.values(Category).find(c => c === category?.trim().toUpperCase());

                        return {
                            id: crypto.randomUUID(),
                            name: name?.trim() || 'Item sem nome',
                            quantity: parseInt(quantity?.trim()) || 1,
                            unitPrice: parseFloat(unitPrice?.trim().replace(',', '.')) || 0,
                            category: validCategory || null,
                            checked: checked?.trim().toLowerCase() === 'true',
                        };
                    });
            }
            onImport(newItems);
        } catch (e) {
            console.error("Import error:", e);
            setError(e instanceof Error ? e.message : 'Formato inválido. Verifique o console para mais detalhes.');
        }
    };

    const TabButton: React.FC<{ tab: Tab, label: string }> = ({ tab, label }) => (
        <button
            onClick={() => {
                setActiveTab(tab);
                setError(null);
                setInputValue('');
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${activeTab === tab ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:bg-gray-700/20 hover:text-gray-200'}`}
        >
            {label}
        </button>
    );

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInputValue(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            setError('Falha ao colar da área de transferência. Por favor, cole manualmente.');
        }
    };
    
    const currentPlaceholder = useMemo(() => PLACEHOLDERS[activeTab], [activeTab]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-40"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: "100%", opacity: 0.8 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0.8 }}
                transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                className="bg-gray-800/60 backdrop-blur-xl border border-white/10 w-full max-w-2xl h-full md:h-[70vh] md:max-h-[90vh] rounded-t-2xl md:rounded-2xl flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Importar Lista</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                        <CloseIcon />
                    </button>
                </header>

                <main className="p-4 sm:p-6 flex-grow flex flex-col">
                    <div className="flex border-b border-white/10">
                        <TabButton tab="text" label="Texto Puro" />
                        <TabButton tab="json" label="JSON" />
                        <TabButton tab="csv" label="CSV" />
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-b-lg flex-grow flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                                {activeTab === 'text' && <p className="text-xs text-gray-400 mb-2">Digite ou cole um item por linha. Apenas os nomes serão importados.</p>}
                                {activeTab === 'json' && <p className="text-xs text-gray-400 mb-2">Cole um array de objetos JSON. Campos opcionais: <code>quantity, unitPrice, category, checked</code>.</p>}
                                {activeTab === 'csv' && <p className="text-xs text-gray-400 mb-2">Use o formato: <code>nome,quantidade,preço,CATEGORIA,marcado(true/false)</code></p>}
                                <div className="relative flex-grow">
                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={currentPlaceholder}
                                        className="w-full h-full bg-gray-900/50 border-2 border-white/10 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handlePaste}
                                        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white bg-gray-900/50 rounded-full hover:bg-white/10"
                                        aria-label="Colar da área de transferência"
                                    >
                                        <PasteIcon className="w-4 h-4"/>
                                    </button>
                                </div>
                                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
                
                <footer className="flex items-center justify-end p-4 mt-auto border-t border-white/10 flex-shrink-0">
                    <button onClick={handleImport} className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center gap-2">
                        <UploadIcon />
                        Importar Itens
                    </button>
                </footer>
            </motion.div>
        </motion.div>
    );
};