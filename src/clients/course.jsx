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
    return await super.callApi('get', '/posts', { q });
  }

  async getListCourses() {
    return await super.callApi('get', '/course', {});
  }

  async createCourse(newCourse) {
    return await super.callApi('post', '/course', newCourse);
  }

  async getCourseByTrainee({ traineeId }) {
    return await super.callApi('get', '/course-by-trainee', { traineeId });
  }

  // async updateCourse(props: {courseId})
}

export const courseClient = () => {
  return new CourseClient();
};
