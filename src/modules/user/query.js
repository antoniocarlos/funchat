const UserRepository = require('./repositories/UserRepository');
const ListUsersService = require('./services/ListUsersService')

module.exports = {
  getUsers: async () => {
    const userRepository = new UserRepository()
    const listUsersService = new ListUsersService(userRepository);
    return listUsersService.listAll();
  }
}