import { trainees } from '../data/trainee';
import { BaseClient } from './base';

class TraineeClient extends BaseClient {
  getAllTrainees() {
    return trainees;
  }
}

export const traineeClient = () => {
  return new TraineeClient();
};
