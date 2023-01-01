import { learningPath } from '../data/learningPath';
import { BaseClient } from './base';

class LearningPathClient extends BaseClient {
  getAllLearningPath() {
    return learningPath;
  }
}

export const learningPathClient = () => {
  return new LearningPathClient();
};
