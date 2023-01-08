import { learningPathCertificate } from '../data/learningPathCertificate';
import { trainees } from '../data/trainee';
import { BaseClient } from './base';

class LearningPathClient extends BaseClient {
  async getAllLearningPath() {
    return await super.callApi('get', '/learningpath', {});
  }

  async createLearningPath(newLearningPath) {
    return await super.callApi('post', '/learningpath', newLearningPath);
  }

  async getLearningPath({ learningPathId }) {
    return super.callApi('get', `/learningpath/${learningPathId}`, {});
  }

  async deleteLearningPath({ learningPathId }) {
    return super.callApi('delete', `/learningpath/${learningPathId}`, {});
  }

  async addCourseIntoLearningPath({
    learningPathId,
    courseId,
    courseOrder = 0
  }) {
    return super.callApi('post', '/learningpathcourse', {
      learningPathId,
      courseId,
      courseOrder
    });
  }

  async getCertificationOfLearningPath({ learningPathId }) {
    return await super.callApi(
      'get',
      `/learningpath/${learningPathId}/CertificatedTrainees`,
      {}
    );
  }
}

export const learningPathClient = () => {
  return new LearningPathClient();
};
