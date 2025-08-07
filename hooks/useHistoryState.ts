import { useState, useCallback, useEffect } from 'react';

export function useHistoryState<T>(initialState: T, storageKey: string) {
  const [history, setHistory] = useState<T[]>(() => {
    try {
      const storedHistory = window.localStorage.getItem(storageKey);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          return parsedHistory;
        }
      }
    } catch (error) {
      console.error(`Failed to parse history for ${storageKey} from localStorage`, error);
    }
    return [initialState];
  });
  
  const [pointer, setPointer] = useState(() => history.length - 1);

  // Save to localStorage whenever history changes
  useEffect(() => {
    // Prevent saving if storageKey is noop (e.g., when no list is active)
    if (storageKey === 'noop') return;
    
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(history));
    } catch (error) {
      console.error(`Failed to save history for ${storageKey} to localStorage`, error);
    }
  }, [history, storageKey]);

  // Load from localStorage when storageKey changes
  useEffect(() => {
    if (storageKey === 'noop') return;
    
    try {
      const storedHistory = window.localStorage.getItem(storageKey);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setHistory(parsedHistory);
          setPointer(parsedHistory.length - 1);
          return;
        }
      }
    } catch (error) {
      console.error(`Failed to load history for ${storageKey} from localStorage`, error);
    }
    
    // If no valid data found, initialize with initialState
    setHistory([initialState]);
    setPointer(0);
  }, [storageKey, initialState]);

  const setState = useCallback((newState: T | ((prevState: T) => T), bypass = false) => {
    const resolvedState = typeof newState === 'function' 
        ? (newState as (prevState: T) => T)(history[pointer]) 
        : newState;
    
    if (bypass) {
        // Replace current state without adding to history
        const newHistory = [...history];
        newHistory[pointer] = resolvedState;
        setHistory(newHistory);
    } else {
        const newHistory = history.slice(0, pointer + 1);
        newHistory.push(resolvedState);
        setHistory(newHistory);
        setPointer(newHistory.length - 1);
    }
  }, [pointer, history]);

  const undo = useCallback(() => {
    if (pointer > 0) {
      setPointer(p => p - 1);
    }
  }, [pointer]);

  const redo = useCallback(() => {
    if (pointer < history.length - 1) {
      setPointer(p => p + 1);
    }
  }, [pointer, history.length]);

  return {
    state: history[pointer] || initialState,
    setState,
    undo,
    redo,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1,
  };
}