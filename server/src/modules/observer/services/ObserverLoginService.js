const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');


class ObserverLoginService {

  constructor(repository) {
    this.observerRepository = repository;
  }

  async login(observerName) {

    let errors = {};

    try {

      // Validate input data
      if (observerName.trim() === '') {
        errors.email = 'O nome de observador deve ser preenchido'
      }

      if (Object.keys(errors).length > 0) {
        throw errors
      }

      if (await this.observerRepository.findByName(observerName)) {
        errors.observerName = 'Este nome de observador já está em uso'
        throw new UserInputError('Este nome de observador já está em uso', { errors })
      }

      const observer =  await this.observerRepository.create(observerName);

      const token = jwt.sign({ observerName }, process.env.JWT_SECRET);

      const returnObserver = {
        ...observer,
        token
      }

      return returnObserver
    } catch (err) {
      console.log(errors);
      throw new UserInputError('Bad input', { errors });
    }
  }

}



module.exports = ObserverLoginService;