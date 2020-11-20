const userQuery = require('./user/query');
const observerQuery = require('./observer/query');

module.exports = {
  ...userQuery,
  ...observerQuery
}