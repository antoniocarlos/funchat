const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class UserLoginService {

  constructor(repository) {
    this.userRepository = repository;
  }

  async login(email, password) {

    let errors = {};

    try {

      // Validate input data
      if (email.trim() === '') {
        errors.email = 'O email deve ser preenchido'
      }
      if (password.trim() === ''){
        errors.password = 'A senha deve ser preenchida'
      }

      if (Object.keys(errors).length > 0) {
        throw errors
      }

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        errors.email = 'Usuário não encontrado'
        throw new UserInputError('Usuário não encontrado', { errors })
      }

      const correctPassword = await bcrypt.compare(password, user.password)

      if (!correctPassword) {
        errors.password = 'Senha incorreta';
        throw new AuthenticationError('Senha incorreta', { errors });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      const returnUser = {
        ...user,
        token
      }

      return returnUser
    } catch (err) {
      console.log(errors);
      throw new UserInputError('Bad input', { errors });
    }
  }

}



module.exports = UserLoginService;