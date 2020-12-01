import { UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';

class ObserverLoginService {
  constructor(repository) {
    this.observerRepository = repository;
  }

  async login(observerName) {
    const errors = {};

    try {
      // Validate input data
      if (observerName.trim() === '') {
        errors.observerName = 'O nome de observador deve ser preenchido';
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      if (await this.observerRepository.findByName(observerName)) {
        errors.observerName = 'Este nome de observador já está em uso';
        throw new UserInputError('Este nome de observador já está em uso', {
          errors,
        });
      }

      const observer = await this.observerRepository.create(observerName);

      const type = 'observer';

      const token = jwt.sign(
        { name: observerName, type },
        process.env.JWT_SECRET,
      );

      const returnObserver = {
        ...observer,
        token,
      };

      return returnObserver;
    } catch (err) {
      console.log(errors);
      throw new UserInputError('Bad input', { errors });
    }
  }
}

export default ObserverLoginService;
