const { UserInputError } = require('apollo-server');
const { Yup, getValidationErrors } = require('yup');
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

      /**
            const schema = Yup.object().shape({
              userName: Yup.string().transform((value, originalValue) => (/\s/.test(originalValue) ? "" : value)).required('user name must not be empty'),
              email: Yup.string().email().required('Type a valid email'),
              birthDate: Yup.date().required('Type a valid birth date'),
              password: Yup.string().transform((value, originalValue) => (/\s/.test(originalValue) ? "" : value)).required('Type a valid password'),
              confirmPassword: Yup.string().oneOf(
                [Yup.ref('password')],
                'Password confirmation is incorrect'
              )
            });
      
            await schema.validate({
              userName,
              email,
              birthDate,
              password,
              confirmPassword,
              imageUrl
            }, {
              abortEarly: false,
            });
      
      */

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
        password
      });

      return user;

    } catch (err) {
      console.log(errors);
      throw new UserInputError('Bad input', { errors });
    }
  }

}



module.exports = CreateUserService;