import { Alert, Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    isOpen: false,
    type: 'info',
    message: '',
    horizontal: 'right'
  });

  const hide = () => {
    toast.isOpen = false;
    setToast({ ...toast });
  };

  const show = (type, message, horizontal = 'right') => {
    setToast({ isOpen: true, type, message, horizontal });
  };

  const success = (message, horizontal = 'right') => {
    show('success', message, horizontal);
  };
  const info = (message, horizontal = 'right') => {
    show('info', message, horizontal);
  };
  const warning = (message, horizontal = 'right') => {
    show('warning', message, horizontal);
  };
  const error = (message, horizontal = 'right') => {
    show('error', message, horizontal);
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
          horizontal: toast.horizontal
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
 *  success(message: string, horizontal?: 'right' | 'center' | 'left'),
 *  info(message: string, horizontal?: 'right' | 'center' | 'left'),
 *  warning(message: string, horizontal?: 'right' | 'center' | 'left'),
 *  error(message: string, horizontal?: 'right' | 'center' | 'left'),
 * }}
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within ToastProvider!');
  }

  return context;
};
