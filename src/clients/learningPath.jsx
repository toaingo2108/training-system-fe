import { learningPath } from '../data/learningPath';
import { learningPathCertificate } from '../data/learningPathCertificate';
import { roles } from '../data/roles';
import { trainees } from '../data/trainee';
import { groupBy } from '../utils';
import { BaseClient } from './base';

class LearningPathClient extends BaseClient {
  getAllLearningPath() {
    return super.callApi('get', '/learningpath', {});
  }

  createLearningPath(newLearningPath) {
    return super.callApi('post', '/learningpath', newLearningPath);
  }

  getLearningPath({ learningPathId }) {
    return learningPath.find((item) => item.id === learningPathId);
  }

  // getLearningPathWithRole() {
  //   return groupBy(
  //     learningPath.map((item) => {
  //       return {
  //         ...item,
  //         roleName: roles.find((r) => r.id === item.forRole)?.name || ''
  //       };
  //     }),
  //     'forRoleId'
  //   );
  // }

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
