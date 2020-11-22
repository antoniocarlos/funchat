const {userMutations} = require('./user');
const {observerMutations} = require('./observer');
const {messageMutations} = require('./message');
const {chatRoomMutations} = require('./chatRoom');

module.exports = {
  ...userMutations,
  ...observerMutations,
  ...messageMutations,
  ...chatRoomMutations
}