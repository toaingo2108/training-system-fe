import { Alert, Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    isOpen: false,
    type: 'info',
    message: ''
  });

  const hide = () => {
    toast.isOpen = false;
    setToast({ ...toast });
  };

  const show = (type, message) => {
    setToast({ isOpen: true, type, message });
  };

  const success = (message) => {
    show('success', message);
  };
  const info = (message) => {
    show('info', message);
  };
  const warning = (message) => {
    show('warning', message);
  };
  const error = (message) => {
    show('error', message);
  };

  return (
    <ToastContext.Provider value={{ success, info, warning, error }}>
      {children}
      <Snackbar
        open={toast.isOpen}
        autoHideDuration={3000}
        onClose={hide}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert
          elevation={6}
          onClose={hide}
          severity={toast.type}
          style={{ widht: '100px' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

/**
 *
 * @returns {{
 *  success(message: string),
 *  info(message: string),
 *  warning(message: string),
 *  error(message: string),
 * }}
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within ToastProvider!');
  }

  return context;
};
