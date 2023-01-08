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

  async addTraineeIntoClass({ classId, gpa, traineeId }) {
    return await super.callApi('post', '/traineeclass', {
      classId,
      gpa,
      traineeId
    });
  }
}

export const classesClient = () => {
  return new ClassesClient();
};
