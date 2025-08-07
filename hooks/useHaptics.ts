import { useCallback } from 'react';

export const useHaptics = () => {
    const triggerHapticFeedback = useCallback((style: 'light' | 'medium' | 'heavy' = 'light') => {
        if (window.navigator && window.navigator.vibrate) {
            switch (style) {
                case 'light':
                    window.navigator.vibrate(20);
                    break;
                case 'medium':
                    window.navigator.vibrate(40);
                    break;
                case 'heavy':
                    window.navigator.vibrate([10, 200, 10]);
                    break;
                default:
                    window.navigator.vibrate(20);
            }
        }
    }, []);

    return { triggerHapticFeedback };
};
