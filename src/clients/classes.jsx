import { BaseClient } from './base';

class ClassesClient extends BaseClient {
  async getClass({ classId }) {
    return await super.callApi('get', `/class/${classId}`, {});
  }

  async getClassesByCourseId({ courseId }) {
    return await super.callApi('get', '/class', {
      params: { courseId }
    });
  }

  async createClass(newClass) {
    return await super.callApi('post', '/class', newClass);
  }
}

export const classesClient = () => {
  return new ClassesClient();
};
