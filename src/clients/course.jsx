import { courses } from '../data/courses';
import { learningPathCourse } from '../data/learningPathCourse';
import { BaseClient } from './base';

class CourseClient extends BaseClient {
  getAllCourses() {
    return courses;
  }

  /**
   *
   * @param {{
   *  id: number
   * }} param0
   * @returns
   */
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

  getCoursesOfLearningPath({ learningPathId }) {
    return learningPathCourse
      .filter((item) => item.learningPathId === learningPathId)
      .map((item) => {
        return {
          ...item,
          course: courses.find((course) => course.id === item.courseId)
        };
      });
  }
}

export const courseClient = () => {
  return new CourseClient();
};
