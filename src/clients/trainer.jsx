import { courses } from '../data/courses';
import { BaseClient } from './base';

class TrainerClient extends BaseClient {
  async getAllTrainers() {
    return await super.callApi('get', '/trainer', {});
  }

  async createTrainer(newTrainer) {
    return await super.callApi('post', '/trainer', newTrainer);
  }

  getCourseByTrainer({ trainerId }) {
    return courses.find((course) => course.trainerID === trainerId);
  }

  async getTrainer({ trainerId }) {
    return await super.callApi('get', `/trainer/${trainerId}`, {});
  }

  async updateTrainer({ id, firstName, lastName, imgLink }) {
    return await super.callApi('put', `/trainer/${id}`, {
      firstName,
      lastName,
      imgLink
    });
  }
}

export const trainerClient = () => {
  return new TrainerClient();
};
