import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { roleClient } from '../clients/role';
import { useLoading } from './loading';

export const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
  const loading = useLoading();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      loading.show();
      const resRoles = await roleClient().getListRoles();
      loading.hide();
      if (resRoles.success) {
        setRoles(resRoles.data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RolesContext.Provider value={[roles, setRoles]}>
      {children}
    </RolesContext.Provider>
  );
};

/**
 *
 * @returns {[
 *  roles: never[],
 *  setRoles: React.Dispatch<React.SetStateAction<never[]>>
 * ]}
 */
export const useRoles = () => {
  const context = useContext(RolesContext);

  if (context === undefined) {
    throw new Error('useRoles must be used within RolesProvider!');
  }

  return context;
};
