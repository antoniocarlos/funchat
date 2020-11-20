const userMutations = require('./user/mutation');
const observerMutations = require('./observer/mutation');

module.exports = {
  ...userMutations,
  ...observerMutations
}