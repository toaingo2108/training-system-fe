import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { departmentClient } from '../clients/department';
import { useLoading } from './loading';

export const DepartmentsContext = createContext();

export const DepartmentsProvider = ({ children }) => {
  const loading = useLoading();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      loading.show();
      const resDepartments = await departmentClient().getListDepartments();
      loading.hide();
      if (resDepartments.success) {
        setDepartments(resDepartments.data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DepartmentsContext.Provider value={[departments, setDepartments]}>
      {children}
    </DepartmentsContext.Provider>
  );
};

/**
 *
 * @returns {[
 *  departments: never[],
 *  setDepartments: React.Dispatch<React.SetStateAction<never[]>>
 * ]}
 */
export const useDepartments = () => {
  const context = useContext(DepartmentsContext);

  if (context === undefined) {
    throw new Error('useDepartments must be used within DepartmentsProvider!');
  }

  return context;
};
