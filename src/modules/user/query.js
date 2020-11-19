const listUsersService = require('./services/listUsersService')

module.exports = {
  getUsers: async () => {
    return listUsersService;
  }
}