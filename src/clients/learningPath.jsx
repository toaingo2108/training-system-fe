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

  getLearningPathCertificate({ learningPathId }) {
    return learningPathCertificate
      .filter((item) => item.learningPathId === learningPathId)
      .map((item) => {
        return {
          ...item,
          ...trainees.find((trainee) => trainee.id === item.traineeId)
        };
      });
  }
}

export const learningPathClient = () => {
  return new LearningPathClient();
};
