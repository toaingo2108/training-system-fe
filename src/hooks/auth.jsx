import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const users = [
  {
    id: 1,
    firstName: 'Ngô Quốc',
    lastName: 'Toại',
    username: 'toaingo',
    password: '123456'
  }
];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const login = async (userLogin) => {
    const _user = users.find(
      (user) =>
        user.username === userLogin.username &&
        user.password === userLogin.password
    );
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
        data: []
      };
    }
  };

  const logout = () => {
    setUser({});
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
