import { useContext, useLayoutEffect, useState } from 'react';
import { createContext } from 'react';
import { adminUserClient } from '../clients/adminUser';
import { fetchUser } from '../utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userLogin) => {
    const _res = await adminUserClient().adminUserLogin({
      username: userLogin.username,
      password: userLogin.password
    });
    if (_res.success) {
      setUser(_res.data[0]);
      localStorage.setItem('_user', JSON.stringify(_res.data[0]));
    }
    return _res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('_user');
  };

  useLayoutEffect(() => {
    const _user = fetchUser();
    if (!!_user?.userInfo) {
      const res = login(_user?.userInfo);
      if (res.success) setUser(_user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 *
 * @returns {{
 *  user: any
 *  login(user: {
 *    username: string,
 *    password: string,
 *  }),
 *  logout(),
 * }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider!');
  }

  return context;
};
