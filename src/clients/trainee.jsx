import { trainees } from '../data/trainee';
import { BaseClient } from './base';

class TraineeClient extends BaseClient {
  getAllTrainees() {
    return trainees;
  }

  createTrainee(newTrainee) {
    let _trainee = { id: trainees.length + 1, ...newTrainee };
    // trainees.push(_trainee);
    return _trainee;
  }
}

export const traineeClient = () => {
  return new TraineeClient();
};
