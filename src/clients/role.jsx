import { BaseClient } from './base';

class RoleClient extends BaseClient {
  async getListRoles() {
    return super.callApi('get', '/role', {});
  }

  async createRole({ name }) {
    return super.callApi('post', '/role', { name });
  }
}

export const roleClient = () => {
  return new RoleClient();
};
