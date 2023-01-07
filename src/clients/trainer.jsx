import { courses } from '../data/courses';
import { trainers } from '../data/trainers';
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

  getTrainer({ trainerId }) {
    return trainers.find((trainer) => trainer.id === trainerId);
  }
}

export const trainerClient = () => {
  return new TrainerClient();
};
