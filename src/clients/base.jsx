import axios from 'axios';
import { baseURL } from '../constants/baseURl';

export class BaseClient {
  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {any} data
   * @returns {Promise<any>}
   */
  async callApi(method, url, data) {
    // if (!data) {
    //   data = {};
    // }
    // if (data.q) {
    //   let q = JSON.parse(data.q);
    //   data.q = JSON.stringify({ ...q });
    // }
    console.log({
      method,
      baseURL: baseURL,
      url,
      data
    });
    // return await axios({
    //   method,
    //   baseURL: process.env.BASE_URL,
    //   url,
    //   data
    // });
  }
}
