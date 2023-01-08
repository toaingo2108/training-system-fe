import { BaseClient } from './base';

class DepartmentClient extends BaseClient {
  async getListDepartments() {
    return super.callApi('get', '/department', {});
  }

  async createDepartment({ name }) {
    return super.callApi('post', '/department', { name });
  }

  async updateDepartment({ id, name }) {
    return super.callApi('put', `/department/${id}`, { name });
  }

  async deleteDepartment({ id }) {
    return super.callApi('delete', `/department/${id}`, {});
  }
}

export const departmentClient = () => {
  return new DepartmentClient();
};
