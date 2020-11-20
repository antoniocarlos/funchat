class ListUsersService {

  constructor(repository) {
    this.userRepository = repository;
  }

  async listAll () {
    try {
      const users = await this.userRepository.findAll();
      return users
    } catch (err) {
      console.log(err);
    }
  }
}


module.exports = ListUsersService;