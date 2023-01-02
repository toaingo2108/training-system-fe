export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('_user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('_user'))
      : localStorage.clear();

  return userInfo;
};

/**
 *
 * @param {any[]} xs
 * @param {string} key
 * @returns {Object}
 */
export const groupBy = (xs, key) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

/**
 *
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export const textAbstract = (text, length = 20) => {
  if (text == null) {
    return '';
  }
  if (text.length <= length) {
    return text;
  }
  text = text.substring(0, length);
  const last = text.lastIndexOf(' ');
  text = text.substring(0, last);
  return text + '...';
};
