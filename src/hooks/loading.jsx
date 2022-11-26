import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, useContext, useState } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState({ value: false, message: '' });

  const show = (message) => {
    setLoading({ value: true, message });
  };

  const hide = () => {
    setLoading({ value: false, message: '' });
  };

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {children}
      <Backdrop style={{ zIndex: 10000, color: '#fff' }} open={loading.value}>
        <CircularProgress color='inherit' size={18} />
        <p style={{ paddingLeft: 10 }}>{loading.message}</p>
      </Backdrop>
    </LoadingContext.Provider>
  );
};

/**
 *
 * @returns {{
 *  show(message?: string),
 *  hide()
 * }}
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    throw new Error('useLoading must be used within LoadingProvider!');
  }

  return context;
};
