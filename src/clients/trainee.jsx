import { trainees } from '../data/trainee';
import { traineeClass } from '../data/traineeClass';
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

  getTraineeOfClass({ classId }) {
    return traineeClass
      .filter((item) => item.classID === classId)
      .map((item) => {
        return {
          ...item,
          ...trainees.find((trainee) => trainee.id === item.traineeID)
        };
      });
  }

  getTraineeDetail({ traineeId }) {
    return trainees.find((trainee) => trainee.id === traineeId);
  }
}

export const traineeClient = () => {
  return new TraineeClient();
};
