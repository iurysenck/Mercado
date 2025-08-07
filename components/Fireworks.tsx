import React from 'react';
import { motion } from 'framer-motion';

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const FireworkParticle: React.FC = () => {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = randomBetween(2, 6);
    
    const style = {
        position: 'absolute' as const,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 2}px ${size}px ${color}`,
        filter: `blur(${size * 0.5}px)`,
    };

    return (
        <motion.div
            style={style}
            animate={{
                x: randomBetween(-150, 150),
                y: randomBetween(-150, 150),
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: randomBetween(0, 360),
            }}
            transition={{
                duration: randomBetween(0.8, 1.5),
                ease: "easeOut",
                times: [0, 0.3, 1],
            }}
        />
    );
};

const Firework: React.FC = () => {
    const style = {
        left: `${randomBetween(5, 95)}%`,
        top: `${randomBetween(10, 80)}%`,
        position: 'absolute' as const,
    };

    const particleCount = Math.floor(randomBetween(25, 45));
    
    return (
        <motion.div
            className="w-2 h-2"
            style={style}
            initial={{ opacity: 0, y: 100, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                y: 0,
                scale: [0, 1, 0],
            }}
            transition={{
                duration: randomBetween(1.0, 2.0),
                ease: "easeOut",
                delay: randomBetween(0, 3),
                repeat: Infinity,
                repeatDelay: randomBetween(1, 4),
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

const Sparkle: React.FC = () => {
    const colors = ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#FF4500'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = randomBetween(1, 3);
    
    const style = {
        left: `${randomBetween(0, 100)}%`,
        top: `${randomBetween(0, 100)}%`,
        position: 'absolute' as const,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 3}px ${size}px ${color}`,
        filter: `blur(${size * 0.3}px)`,
    };

    return (
        <motion.div
            style={style}
            animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: randomBetween(0, 360),
            }}
            transition={{
                duration: randomBetween(0.5, 1.2),
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: randomBetween(0.5, 2),
                delay: randomBetween(0, 1),
            }}
        />
    );
};

export const Fireworks: React.FC = () => {
    const fireworkCount = 25;
    const sparkleCount = 50;
    
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Fogos principais */}
            {Array.from({ length: fireworkCount }).map((_, index) => (
                <Firework key={`firework-${index}`} />
            ))}
            
            {/* Sparkles adicionais */}
            {Array.from({ length: sparkleCount }).map((_, index) => (
                <Sparkle key={`sparkle-${index}`} />
            ))}
            
            {/* Overlay de brilho */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-200/10 to-transparent"
                animate={{
                    opacity: [0, 0.3, 0],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
            />
        </div>
    );
};