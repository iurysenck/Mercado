import React, { createContext, useContext, useState, useCallback } from 'react';
import { ConfirmationModal, ConfirmationModalProps } from '../components/ConfirmationModal';

type ModalOptions = Omit<ConfirmationModalProps, 'isOpen' | 'onClose' | 'onConfirm'>;

interface ModalContextType {
  showConfirmation: (options: ModalOptions) => Promise<boolean>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalOptions | null>(null);
  const [resolver, setResolver] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const showConfirmation = useCallback((options: ModalOptions) => {
    return new Promise<boolean>((resolve) => {
      setModalState(options);
      setResolver({ resolve });
    });
  }, []);

  const handleClose = () => {
    if (resolver) {
      resolver.resolve(false);
    }
    setModalState(null);
    setResolver(null);
  };

  const handleConfirm = () => {
    if (resolver) {
      resolver.resolve(true);
    }
    setModalState(null);
    setResolver(null);
  };

  return React.createElement(
    ModalContext.Provider,
    { value: { showConfirmation } },
    children,
    modalState && React.createElement(ConfirmationModal, {
      ...modalState,
      isOpen: !!modalState,
      onClose: handleClose,
      onConfirm: handleConfirm,
    })
  );
};
