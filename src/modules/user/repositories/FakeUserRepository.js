class FakeUserRepository {

  constructor(){
    this.users = [];
  }
  async create({
    userName,
    email,
    birthDate,
    password
  }) {
    const index = this.users.length;
    const user = {
      id: index,
      userName,
      email,
      birthDate,
      password
    }
    this.users.push(user);
    return user;
  }

  async findByName(name) {
    const user = this.users.find(user => user.userName===name);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email===email);
    return user;
  }
  
  async findAll() {
    return this.users;
  }
  
}

module.exports = FakeUserRepository