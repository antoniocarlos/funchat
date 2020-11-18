const { User } = require('../models');
const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
let yup = require('yup');

// A map of functions which return data for the schema.
// controllers

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();

        return users
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let {
        username,
        email,
        password,
        confirmPassword,
        imageUrl
      } = args;

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

        await schema.validate(args, {
          abortEarly: false,
        });

        // Check if users exists
        const userByUsername = await User.findOne({ where: { username }});
        const userByEmail = await User.findOne({ where: { email }});

        if (userByUsername) errors.username = 'Username is taken';
        if (userByEmail) errors.email = 'Email is taken';

        if(Object.keys(errors).length > 0 ) {
          throw errors
        }

        password = await bcrypt.hash(password, 6);

        // Creates a user on database
        const user = await User.create({
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
  }
};


