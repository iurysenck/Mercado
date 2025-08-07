import React from 'react';
import { motion } from 'framer-motion';

const Blob: React.FC<{ className: string; animate: any }> = ({ className, animate }) => {
    return (
        <motion.div
            className={`absolute rounded-full mix-blend-normal filter blur-3xl opacity-30 ${className}`}
            animate={animate}
        />
    );
};

interface InteractiveBackgroundProps {
    children: React.ReactNode;
    mood?: 'default' | 'celebration';
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ children, mood = 'default' }) => {
    const colors = {
        default: {
            blob1: 'bg-purple-600',
            blob2: 'bg-blue-600',
            blob3: 'bg-teal-600',
        },
        celebration: {
            blob1: 'bg-yellow-400',
            blob2: 'bg-orange-500',
            blob3: 'bg-rose-500',
        }
    };

    const currentColors = colors[mood];

    return (
        <div className="relative bg-gray-950 min-h-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/30"></div>
                <Blob
                    className={`w-[500px] h-[500px] ${currentColors.blob1}`}
                    animate={{
                        x: ['-30%', '30%', '-30%'],
                        y: ['-30%', '40%', '-30%'],
                        rotate: [0, 90, 180],
                        transition: { duration: 120, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }
                    }}
                />
                <Blob
                    className={`w-[450px] h-[450px] ${currentColors.blob2} top-1/2 left-1/2`}
                     animate={{
                        x: ['40%', '-40%', '40%'],
                        y: ['30%', '-30%', '30%'],
                        rotate: [0, -90, -180],
                        transition: { duration: 140, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }
                    }}
                />
                 <Blob
                    className={`w-[400px] h-[400px] ${currentColors.blob3} bottom-0 right-0`}
                     animate={{
                        x: ['50%', '-20%', '50%'],
                        y: ['20%', '-50%', '20%'],
                        rotate: [45, 135, 45],
                        transition: { duration: 160, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }
                    }}
                />
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
