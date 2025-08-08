import React from 'react';
import { motion } from 'framer-motion';
import { COLOR_PALETTE, getCategoryStyle, setCategoryColor } from '../constants';
import { CloseIcon } from './IconComponents';

interface ColorPalettePickerProps {
    categoryName: string;
    onClose: () => void;
}

export const ColorPalettePicker: React.FC<ColorPalettePickerProps> = ({ categoryName, onClose }) => {
    const handleSelectColor = (index: number) => {
        setCategoryColor(categoryName, index);
    };

    const currentStyle = getCategoryStyle(categoryName);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                className="bg-gray-800/80 backdrop-blur-xl border border-white/10 w-full max-w-sm rounded-2xl flex flex-col shadow-2xl m-4"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                    <div className="flex items-center gap-2">
                         <div className={`w-5 h-5 rounded-full ${currentStyle.swatch}`} />
                         <h2 className="text-lg font-bold text-white truncate">Cor para "{categoryName}"</h2>
                    </div>
                    <button onClick={onClose} className="p-3 -m-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </header>
                <main className="p-6">
                    <div className="grid grid-cols-6 gap-4">
                        {COLOR_PALETTE.map((color, index) => {
                             const isSelected = color.name === currentStyle.name;
                             return (
                                <motion.button
                                    key={color.name}
                                    onClick={() => handleSelectColor(index)}
                                    className={`w-10 h-10 rounded-full transition-transform duration-200 ${color.swatch} ${isSelected ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : 'hover:scale-110'}`}
                                    aria-label={`Selecionar cor ${color.name}`}
                                    whileTap={{ scale: 0.9 }}
                                />
                             )
                        })}
                    </div>
                </main>
            </motion.div>
        </motion.div>
    );
};
