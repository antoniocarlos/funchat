const CreateUserService = require('./services/createUserService')
const UserRepository = require('./repositories/UserRepository');
const userRepository = new UserRepository();
const createUserService = new CreateUserService(userRepository);

module.exports = {
  mutation: {
    register: async (_, args) => {
      return createUserService.create(args);
    }
  }
}