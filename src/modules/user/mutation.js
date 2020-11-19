const createUserService = require('./services/createUserService')

module.exports = {
  register: async (_, args) => {
    return createUserService(args);
  }
}