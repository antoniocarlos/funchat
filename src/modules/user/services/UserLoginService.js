const { UserInputError, AuthenticationError } = require('apollo-server');
const yup = require('yup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class UserLoginService {

  constructor(repository) {
    this.userRepository = repository;
  }

  async login(userName, password) {

    let errors = {};

    try {

      const schema = yup.object().shape({
        userName: yup.string().transform((value, originalValue) => (/\s/.test(originalValue) ? "" : value)).required('user name must not be empty'),
        password: yup.string().transform((value, originalValue) => (/\s/.test(originalValue) ? "" : value)).required('Type a valid password'),
      });
  
      await schema.validate({
        userName,
        password
      }, {
        abortEarly: false,
      });


      const user = await this.userRepository.findByName(userName);

      if (!user) {
        errors.userName = 'user not found'
        throw new UserInputError('user not found', { errors })
      }

      const correctPassword = await bcrypt.compare(password, user.password)
      

      if (!correctPassword) {
        errors.password = 'password is incorrect';
        throw new AuthenticationError('password is incorrect', { errors });
      }

      const token = jwt.sign({ userName }, process.env.JWT_SECRET);

      user = {
        ...user,
        token
      }

      return user
    } catch (err) {
      console.log(err)
      throw err
    }
  }

}



module.exports = UserLoginService;