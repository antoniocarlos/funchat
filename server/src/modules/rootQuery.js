const {userQueries} = require('./user');
const {observerQueries} = require('./observer');
const {messageQueries} = require('./message');
const {chatRoomQueries} = require('./chatRoom');

module.exports = {
  ...userQueries,
  ...observerQueries,
  ...messageQueries,
  ...chatRoomQueries
}