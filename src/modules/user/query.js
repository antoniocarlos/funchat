const UserRepository = require('./repositories/UserRepository');
const ListUsersService = require('./services/ListUsersService');
const UserLoginService = require('./services/UserLoginService');

const userRepository = new UserRepository();
const listUsersService = new ListUsersService(userRepository);
const userLoginService = new UserLoginService(userRepository);

module.exports = {
  
  getUsers: async () => {
    return listUsersService.listAll();
  },
  login: async (_, args) => {
    const{userName, password} = args;

    const user = userLoginService.login(userName, password);

    return user;
  }
}