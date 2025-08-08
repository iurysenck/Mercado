import { useState, useCallback, useEffect } from 'react';

export function useHistoryState<T>(initialState: T, storageKey: string) {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [pointer, setPointer] = useState(0);

  // Effect to load from storage when the key changes
  useEffect(() => {
    if (storageKey === 'noop') {
      setHistory([initialState]);
      setPointer(0);
      return;
    }
    try {
      const storedHistory = window.localStorage.getItem(`list-history-${storageKey}`);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setHistory(parsedHistory);
          setPointer(parsedHistory.length - 1);
          return;
        }
      }
    } catch (error) {
      console.error(`Failed to parse history for ${storageKey} from localStorage`, error);
    }
    // If nothing in storage, initialize with the provided state
    setHistory([initialState]);
    setPointer(0);
  }, [storageKey]); // Intentionally not including initialState to avoid re-initializing on prop changes

  // Effect to save to storage
  useEffect(() => {
    if (storageKey === 'noop') return;
    try {
      window.localStorage.setItem(`list-history-${storageKey}`, JSON.stringify(history));
    } catch (error) {
      console.error(`Failed to save history for ${storageKey} to localStorage`, error);
    }
  }, [history, storageKey]);

  const setState = useCallback((newState: T | ((prevState: T) => T), bypass = false) => {
    setHistory(currentHistory => {
      const currentState = currentHistory[pointer] ?? initialState;
      const resolvedState = typeof newState === 'function' 
          ? (newState as (prevState: T) => T)(currentState) 
          : newState;
      
      if (bypass) {
        const newHistory = [...currentHistory];
        newHistory[pointer] = resolvedState;
        return newHistory;
      } else {
        const newHistory = currentHistory.slice(0, pointer + 1);
        newHistory.push(resolvedState);
        setPointer(newHistory.length - 1);
        return newHistory;
      }
    });
  }, [pointer, initialState]);

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

  const resetHistory = useCallback((newState: T) => {
    setHistory([newState]);
    setPointer(0);
  }, []);

  return {
    state: history[pointer] ?? initialState,
    setState,
    undo,
    redo,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1,
    resetHistory,
  };
}