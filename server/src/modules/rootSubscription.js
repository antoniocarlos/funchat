//const {userQueries} = require('./user');
//const {observerQueries} = require('./observer');
const {messageSubscriptions} = require('./message');
//const {chatRoomQueries} = require('./chatRoom');

module.exports = {
  ...messageSubscriptions
}