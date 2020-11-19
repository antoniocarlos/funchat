const userRepository = require('../repositories/userRepository');
const {UserInputError} = require('apollo-server');
const yup = require('yup');
const bcrypt = require('bcryptjs');

async function createUserService({
  username,
  email,
  password,
  confirmPassword,
  imageUrl
}) {
  let errors = {};

  try {

    // TODO: Validate input data
    const schema = yup.object().shape({
      username: yup.string().transform((value, originalValue) => (/\s/.test(originalValue) ? "" : value)).required('user name must not be empty'),
      email: yup.string().email().required('Type a valid email'),
      password: yup.string().required('Type a valid password'),
      confirmPassword: yup.string().oneOf(
        [yup.ref('password')],
        'Password confirmation is incorrect'
      )
    });

    await schema.validate({
      username,
      email,
      password,
      confirmPassword,
      imageUrl
    }, {
      abortEarly: false,
    });

    // Check if users exists
    const userByUsername = await userRepository.findOne({ where: { username } });
    const userByEmail = await userRepository.findOne({ where: { email } });

    if (userByUsername) errors.username = 'Username is taken';
    if (userByEmail) errors.email = 'Email is taken';

    if (Object.keys(errors).length > 0) {
      throw errors
    }

    password = await bcrypt.hash(password, 6);

    // Creates a user on database
    const user = await userRepository.create({
      username,
      email,
      password
    });

    return user.toJSON();

  } catch (err) {
    console.log(err);
    throw new UserInputError('User input error', { errors: err });
  }
}

module.exports = createUserService;