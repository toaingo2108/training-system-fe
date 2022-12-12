import React from 'react';
import { AuthProvider } from '../hooks/auth';
import { LoadingProvider } from '../hooks/loading';
import { ToastProvider } from '../hooks/toast';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <ToastProvider>{children}</ToastProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default AppProvider;
