import { trainees } from '../data/trainee';
import { traineeClass } from '../data/traineeClass';
import { BaseClient } from './base';

class TraineeClient extends BaseClient {
  async getAllTrainees() {
    return await super.callApi('get', '/trainee', {});
  }

  async createTrainee(newTrainee) {
    return await super.callApi('post', '/trainee', newTrainee);
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

  async getTraineeDetail({ traineeId }) {
    return await super.callApi('get', `/trainee/${traineeId}`, {});
  }
}

export const traineeClient = () => {
  return new TraineeClient();
};
