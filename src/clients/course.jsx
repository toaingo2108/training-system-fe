import { courses } from '../data/courses';

class CourseClient {
  getAllCourses() {
    return courses;
  }
  getDetailCourse({ id }) {
    return courses.find((course) => course.id === id);
  }
}

export const courseClient = () => {
  return new CourseClient();
};
