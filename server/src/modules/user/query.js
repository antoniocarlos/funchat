import UserRepository from './repositories/UserRepository';
import ListUsersService from './services/ListUsersService';
import UserLoginService from './services/UserLoginService';

const userRepository = new UserRepository();
const listUsersService = new ListUsersService(userRepository);
const userLoginService = new UserLoginService(userRepository);

async function getUsers() {
  const users = await listUsersService.listAll();

  return users;
}

async function login(_, args) {
  const { email, password } = args;

  const user = await userLoginService.login(email, password);

  return user;
}

export default { getUsers, login };
