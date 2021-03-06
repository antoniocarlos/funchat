class FakeUserRepository {
  constructor() {
    this.users = [];
  }

  async create({ userName, email, birthDate, password, imageUrl }) {
    const index = this.users.length;
    const date = new Date();
    const user = {
      id: index,
      userName,
      email,
      birthDate,
      password,
      imageUrl,
      createdAt: date,
      updatedAt: date,
    };

    this.users.push(user);
    return user;
  }

  async findByName(name) {
    const user = this.users.find(user => user.userName === name);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async findAll() {
    return this.users;
  }

  async findAllLess(userName) {
    const users = this.users.filter(user => user.userName !== userName);
    return users;
  }
}

module.exports = FakeUserRepository;
