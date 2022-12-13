import { useContext, useLayoutEffect, useState } from 'react';
import { createContext } from 'react';
import { trainees } from '../data/trainee';
import { fetchUser } from '../utils';

const users = [...trainees];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const _user = fetchUser();
    setUser(_user);
  }, []);

  const login = async (userLogin) => {
    const _user =
      users.find(
        (user) =>
          user.username === userLogin.username &&
          user.password === userLogin.password
      ) || null;
    if (_user) {
      setUser(_user);
      localStorage.setItem('_user', JSON.stringify(_user));
      return {
        status: 'OK',
        data: _user
      };
    } else {
      return {
        status: 'FAILED',
        data: null
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 *
 * @returns {{
 *  user: {
 *    id: number,
 *    username: string,
 *    firstName: string,
 *    lastName: string,
 *  },
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
