import { useContext, useState } from 'react';
import { createContext } from 'react';

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

  const [isAuth, setIsAuth] = useState(false);

  const login = (userLogin) => {
    const _user = users.find(
      (user) =>
        user.username === userLogin.username &&
        user.password === userLogin.password
    );
    if (_user) {
      setUser(_user);
      setIsAuth(true);
      localStorage.setItem('user', user);
    }
  };

  const logout = () => {
    setUser({});
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
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
 *  isAuth: boolean,
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
