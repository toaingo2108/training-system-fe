import { classes } from '../data/classes';
import { BaseClient } from './base';

class ClassesClient extends BaseClient {
  getClass({ classId }) {
    return classes.find((item) => item.id === classId);
  }

  async getClassesByCourseId({ courseId }) {
    return await super.callApi('get', '/class', {
      courseId
    });
  }

  async createClass(newClass) {
    return await super.callApi('post', '/class', newClass);
  }
}

export const classesClient = () => {
  return new ClassesClient();
};
