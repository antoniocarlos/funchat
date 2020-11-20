class ListUsersService {

  constructor(repository) {
    this.observerRepository = repository;
  }

  async listAll () {
    try {
      const observers = await this.observerRepository.findAll();
      return observers
    } catch (err) {
      console.log(err);
    }
  }
}


module.exports = ListUsersService;