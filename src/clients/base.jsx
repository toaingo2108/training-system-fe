import axios from 'axios';

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
    if (!data) {
      data = {};
    }
    return await axios({
      method,
      baseURL: baseURL,
      url,
      data
    });
  }
}
