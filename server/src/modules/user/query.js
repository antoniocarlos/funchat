const UserRepository = require('./repositories/UserRepository');
const ListUsersService = require('./services/ListUsersService');
const UserLoginService = require('./services/UserLoginService');

const userRepository = new UserRepository();
const listUsersService = new ListUsersService(userRepository);
const userLoginService = new UserLoginService(userRepository);

module.exports = {
  query: {
    getUsers: async () => {
      return await listUsersService.listAll();
    },
    login: async (_, args) => {
      const{email, password} = args;
  
      const user = await userLoginService.login(email, password);
  
      return user;
    }
  }
}