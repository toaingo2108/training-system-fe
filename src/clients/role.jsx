import { BaseClient } from './base';

class RoleClient extends BaseClient {
  async getListRoles() {
    return super.callApi('get', '/role', {});
  }

  async createRole({ name }) {
    return super.callApi('post', '/role', { name });
  }

  async updateRole({ id, name }) {
    return super.callApi('put', `/role/${id}`, { name });
  }

  async deleteRole({ id }) {
    return super.callApi('delete', `/role/${id}`, {});
  }
}

export const roleClient = () => {
  return new RoleClient();
};
