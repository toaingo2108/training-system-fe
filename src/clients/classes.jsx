import { classes } from '../data/classes';
import { BaseClient } from './base';

class ClassesClient extends BaseClient {
  getAllClasses() {
    return classes;
  }

  getClass({ classId }) {
    return classes.find((item) => item.id === classId);
  }

  getClassesByCourse({ courseId }) {
    return classes.filter((item) => item.courseID === courseId);
  }
}

export const classesClient = () => {
  return new ClassesClient();
};
