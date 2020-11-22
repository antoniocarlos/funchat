const { UserInputError } = require('apollo-server');
//const { Yup, getValidationErrors } = require('yup');
const bcrypt = require('bcryptjs');

class CreateUserService {

  constructor(repository) {
    this.userRepository = repository;
  }

  async create({
    userName,
    email,
    password,
    birthDate,
    confirmPassword,
    imageUrl
  }) {
    let errors = {};

    try {

      // Validate input data
      if (email.trim() === '') {
        errors.email = 'O email deve ser preenchido'
      }
      if (userName.trim() === ''){
        errors.userName = 'O nome de usuário deve ser preenchido'
      }
      if (birthDate.trim() === ''){
        errors.birthDate = 'A data de nascimento deve ser preenchida'
      }
      if (password.trim() === ''){
        errors.password = 'A senha deve ser preenchida'
      }
      if (confirmPassword.trim() === ''){
        errors.confirmPassword = 'A confirmação de senha deve ser preenchida'
      }
      if (password !== confirmPassword){
        errors.confirmPassword = 'A confirmação de senha deve ser igual a senha'
      }

      if (Object.keys(errors).length > 0) {
        throw errors
      }

      // Check if users exists
      const userByUserName = await this.userRepository.findByName(userName);
      const userByEmail = await this.userRepository.findByEmail(email);
      console.log("passou?");
      if (userByUserName) errors.userName = 'Esse nome de usuário já existe';
      if (userByEmail) errors.email = 'Esse email já existe';

      if (Object.keys(errors).length > 0) {
        throw errors
      }

      birthDate = new Date(birthDate);
      password = await bcrypt.hash(password, 6);

      // Creates a user on database
      const user = await this.userRepository.create({
        userName,
        email,
        birthDate,
        password,
        imageUrl
      });

      return user;

    } catch (err) {
      
      console.log("error " + JSON.stringify(err));
      throw new UserInputError('Bad input', { errors });
    }
  }

}



module.exports = CreateUserService;