const userRepository = require('../repositories/userRepository');

async function listUsersService () {
  try {
    const users = await userRepository.findAll();
    return users
  } catch (err) {
    console.log(err);
  }
}

module.exports = listUsersService;