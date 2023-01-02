import { learningPath } from '../data/learningPath';
import { roles } from '../data/roles';
import { groupBy } from '../utils';
import { BaseClient } from './base';

class LearningPathClient extends BaseClient {
  getAllLearningPath() {
    return learningPath;
  }

  getLearningPath({ learningPathId }) {
    return learningPath.find((item) => item.id === learningPathId);
  }

  getLearningPathWithRole() {
    return groupBy(
      learningPath.map((item) => {
        return {
          ...item,
          roleName: roles.find((r) => r.id === item.forRole)?.name || ''
        };
      }),
      'forRole'
    );
  }
}

export const learningPathClient = () => {
  return new LearningPathClient();
};
