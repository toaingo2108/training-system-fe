import React from 'react';
import { AuthProvider } from '../hooks/auth';
import { DepartmentsProvider } from '../hooks/departments';
import { LoadingProvider } from '../hooks/loading';
import { RolesProvider } from '../hooks/roles';
import { ToastProvider } from '../hooks/toast';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <ToastProvider>
          <DepartmentsProvider>
            <RolesProvider>{children}</RolesProvider>
          </DepartmentsProvider>
        </ToastProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default AppProvider;
