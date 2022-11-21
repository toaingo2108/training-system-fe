import { courses } from '../data/courses';
import { trainers } from '../data/trainers';
import { BaseClient } from './base';

class TrainerClient extends BaseClient {
  getAllTrainer() {
    return trainers;
  }

  getCourseByTrainer({ trainerId }) {
    return courses.find((course) => course.trainerID === trainerId);
  }
}

export const trainerClient = () => {
  return new TrainerClient();
};
