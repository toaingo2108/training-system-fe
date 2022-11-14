import { courses } from '../data/courses';
import { BaseClient } from './base';

class CourseClient extends BaseClient {
  getAllCourses() {
    return courses;
  }
  getDetailCourse({ id }) {
    return courses.find((course) => course.id === id);
  }
  async testApi() {
    const q = { a: 1, b: 2 };
    return await super.callApi('get', '/hahaha', { q });
  }
}

export const courseClient = () => {
  return new CourseClient();
};
