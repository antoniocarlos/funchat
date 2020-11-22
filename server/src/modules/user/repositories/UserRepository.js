const { User } = require('../../../infra/database/models');

class UserRepository {
  constructor() {

  }

  async create({
    userName,
    email,
    birthDate,
    password,
    imageUrl
  }) {
    const user = await User.create({
      userName,
      email,
      birthDate,
      password,
      imageUrl
    });

    return this.convertUser(user);
  }


  async findByName(userName) {
    const user = await User.findOne({ where: { userName } });

    return user ? this.convertUser(user) : user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user ? this.convertUser(user) : user;
  }

  async findAll() {
    const users = await User.findAll();
    const JSONUsers = users.map(user => this.convertUser(user));
    return JSONUsers;
  }

  async findAllLess(userName) {
    const users = await User.findAll({
      where: { userName: { [Op.ne]: user.userName } },
    });
    const JSONUsers = users.map(user => this.convertUser(user));
    return JSONUsers;
  }

  async updateChatRoom(userName, chatRoomId) {

    await User.update(
      {
        chatRoomId
      },
      {
        where:
        {
          userName
        }
      })

  }

  convertUser(user) {
    const convertedUser = {
      ...user.toJSON(),
      birthDate: user.birthDate.toISOString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }

    return convertedUser;
  }

}

module.exports = UserRepository