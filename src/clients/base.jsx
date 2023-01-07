import axios from 'axios';
import { fetchUser } from '../utils';

const baseURL = process.env.REACT_APP_BASE_URL;
export class BaseClient {
  /**
   *
   * @param {'get' | 'post' | 'put' | 'delete'} method
   * @param {string} url
   * @param {any} data
   * @returns {Promise<any>}
   */
  async callApi(method, url, data) {
    const user = fetchUser();
    if (!data) {
      data = {};
    }
    try {
      const response = await axios({
        method,
        baseURL: baseURL,
        url,
        data,
        headers: {
          Authorization: !!user?.accessToken
            ? `Bearer ${user?.accessToken}`
            : 'No Auth',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
