import { classes } from '../data/classes';
import { BaseClient } from './base';

class ClassesClient extends BaseClient {
  getAllClasses() {
    return classes;
  }
  getClassesByCourse({ courseId }) {
    return classes.filter((item) => item.courseID === courseId);
  }
}

export const classesClient = () => {
  return new ClassesClient();
};
