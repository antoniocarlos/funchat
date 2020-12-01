import CreateUserService from './services/CreateUserService';
import UserRepository from './repositories/UserRepository';

const userRepository = new UserRepository();
const createUserService = new CreateUserService(userRepository);

async function register(_, args) {
  return createUserService.create(args);
}

export default { register };
