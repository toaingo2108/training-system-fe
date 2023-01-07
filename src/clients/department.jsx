import { BaseClient } from './base';

class DepartmentClient extends BaseClient {
  async getListDepartments() {
    return super.callApi('get', '/department', {});
  }

  async createDepartment({ name }) {
    return super.callApi('post', '/department', { name });
  }
}

export const departmentClient = () => {
  return new DepartmentClient();
};
