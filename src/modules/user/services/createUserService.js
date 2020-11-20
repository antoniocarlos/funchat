const {UserInputError} = require('apollo-server');
const yup = require('yup');
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

      birthDate = new Date(birthDate); 
  
      const schema = yup.object().shape({
        userName: yup.string().transform((value, originalValue) => (/\s/.test(originalValue) ? "" : value)).required('user name must not be empty'),
        email: yup.string().email().required('Type a valid email'),
        birthDate: yup.date().required('Type a valid birth date'),
        password: yup.string().transform((value, originalValue) => (/\s/.test(originalValue) ? "" : value)).required('Type a valid password'),
        confirmPassword: yup.string().oneOf(
          [yup.ref('password')],
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

      

      // Check if users exists
      const userByUserName = await this.userRepository.findByName(userName);
      const userByEmail = await this.userRepository.findByEmail(email);
  
      if (userByUserName) errors.userName = 'User name is taken';
      if (userByEmail) errors.email = 'Email is taken';
  
      if (Object.keys(errors).length > 0) {
        throw errors
      }
  
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
      console.log(err);
      throw new UserInputError('User input error', { errors: err });
    }
  }

}



module.exports = CreateUserService;