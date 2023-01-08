import { courses } from '../data/courses';
import { learningPathCourse } from '../data/learningPathCourse';
import { BaseClient } from './base';

class CourseClient extends BaseClient {
  async getAllCourses() {
    return await super.callApi('get', '/course', {});
  }

  async getDetailCourse({ id }) {
    return super.callApi('get', `/course/${id}`, {});
  }

  async createCourse(newCourse) {
    return await super.callApi('post', '/course', newCourse);
  }

  async deleteCourse({ id }) {
    return super.callApi('delete', `/course/${id}`, {});
  }

  async getCoursesOfLearningPath({ learningPathId }) {
    return super.callApi('get', '/course', {
      params: {
        learningPathId
      }
    });
  }
}

export const courseClient = () => {
  return new CourseClient();
};
