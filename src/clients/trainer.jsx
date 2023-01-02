import { courses } from '../data/courses';
import { trainers } from '../data/trainers';
import { BaseClient } from './base';

class TrainerClient extends BaseClient {
  getAllTrainers() {
    return trainers;
  }

  getCourseByTrainer({ trainerId }) {
    return courses.find((course) => course.trainerID === trainerId);
  }

  getTrainer({ trainerId }) {
    return trainers.find((trainer) => trainer.id === trainerId);
  }
  
  createTrainer(newTrainer) {
    let _trainer = { id: trainers.length + 1, ...newTrainer };
    // trainers.push(_trainer);
    return _trainer;
  }
}

export const trainerClient = () => {
  return new TrainerClient();
};
