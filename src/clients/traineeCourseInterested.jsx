import { traineeCourseInterested } from '../data/traineeCourseInterested';
import { BaseClient } from './base';

class TraineeCourseInterestedClient extends BaseClient {
  getAll() {
    return traineeCourseInterested;
  }

  getByCourseId({ courseId }) {
    return traineeCourseInterested.filter((data) => data.courseId === courseId);
  }
}

export const traineeCourseInterestedClient = () => {
  return new TraineeCourseInterestedClient();
};
