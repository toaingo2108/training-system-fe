import { BaseClient } from './base';

class AdminUserClient extends BaseClient {
  async adminUserLogin({ username, password }) {
    return await super.callApi('post', '/adminuser/login', {
      username,
      password
    });
  }
}

export const adminUserClient = () => {
  return new AdminUserClient();
};
