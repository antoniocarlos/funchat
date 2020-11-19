const { User } = require('../../../infra/database/models');

class UserRepository {
  constructor() {

  }

  async create({
    username,
    email,
    password
  }) {
    return await User.create({
      username,
      email,
      password
    })
  }
  
  async findOne(args) {
    return await User.findOne(args);
  }
  
  async findAll() {
    return await User.findAll();
  }
  
}

module.exports = UserRepository