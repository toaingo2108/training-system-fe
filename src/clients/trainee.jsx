import { BaseClient } from './base';

class TraineeClient extends BaseClient {
  async getAllTrainees() {
    return await super.callApi('get', '/trainee', {});
  }

  async createTrainee(newTrainee) {
    return await super.callApi('post', '/trainee', newTrainee);
  }

  async getTraineeDetail({ traineeId }) {
    return await super.callApi('get', `/trainee/${traineeId}`, {});
  }

  async updateTrainee({
    firstName,
    lastName,
    level,
    imgLink,
    roleId,
    departmentId,
    id
  }) {
    return await super.callApi('put', `/trainee/${id}`, {
      firstName,
      lastName,
      level,
      imgLink,
      roleId,
      departmentId
    });
  }
}

export const traineeClient = () => {
  return new TraineeClient();
};
