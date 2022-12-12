export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('_user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('_user'))
      : localStorage.clear();

  return userInfo;
};
