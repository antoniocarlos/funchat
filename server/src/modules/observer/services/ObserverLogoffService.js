const { UserInputError } = require('apollo-server');
//const jwt = require('jsonwebtoken');


class ObserverLogoffService {

  constructor(repository) {
    this.observerRepository = repository;
  }

  async logoff(observerName) {

    let errors = {};

    try {

      // Validate input data
      if (observerName.trim() === '') {
        errors.email = 'O nome de observador deve ser preenchido'
      }

      if (Object.keys(errors).length > 0) {
        throw errors
      }

      const observer = await this.observerRepository.findByName(observerName)

      if (!observer) {
        errors.observerName = 'Observador não encontrado'
        throw new UserInputError('Observador não encontrado', { errors })
      }

      await this.observerRepository.delete(observerName);

      return observer
    } catch (err) {
      console.log(errors);
      throw new UserInputError('Bad input', { errors });
    }
  }

}



module.exports = ObserverLogoffService;