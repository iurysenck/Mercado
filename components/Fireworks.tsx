import React from 'react';
import { motion } from 'framer-motion';

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const FireworkParticle: React.FC = () => {
    const color = `hsl(${randomBetween(0, 360)}, 100%, 70%)`;
    const style = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute' as const,
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 7px 1px ${color}`,
    };

    return (
        <motion.div
            style={style}
            animate={{
                x: randomBetween(-90, 90),
                y: randomBetween(-90, 90),
                scale: 0,
                opacity: [1, 0],
            }}
            transition={{
                duration: randomBetween(0.4, 1.0),
                ease: "easeOut",
            }}
        />
    );
};

const Firework: React.FC = () => {
    const style = {
        left: `${randomBetween(10, 90)}%`,
        top: `${randomBetween(15, 60)}%`,
        position: 'absolute' as const,
    };

    const particleCount = 30;
    
    return (
        <motion.div
            className="w-1 h-1"
            style={style}
            initial={{ opacity: 0, y: 100 }}
            animate={{
                opacity: [0, 1, 0],
                y: 0,
            }}
            transition={{
                duration: randomBetween(0.6, 1.2),
                ease: "linear",
                delay: randomBetween(0, 1.5),
                repeat: Infinity,
                repeatDelay: randomBetween(2, 4),
            }}
        >
            <div className="relative">
                {Array.from({ length: particleCount }).map((_, index) => (
                    <FireworkParticle key={index} />
                ))}
            </div>
        </motion.div>
    );
};

export const Fireworks: React.FC = () => {
    const fireworkCount = 15;
    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: fireworkCount }).map((_, index) => (
                <Firework key={index} />
            ))}
        </div>
    );
};