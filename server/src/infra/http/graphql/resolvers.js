const userQueries = require('../../../modules/user/query');
const observerQueries = require('../../../modules/observer/query');
const messageQueries = require('../../../modules/message/query');
const chatRoomQueries = require('../../../modules/chatRoom/query');

const userMutations = require('../../../modules/user/mutation');
const observerMutations = require('../../../modules/observer/mutation');
const messageMutations = require('../../../modules/message/mutation');
const chatRoomMutations = require('../../../modules/chatRoom/mutation');

const messageSubscriptions = require('../../../modules/message/subscription');
const audienceSubscriptions = require('../../../modules/audience/subscription');

module.exports = {
  Query: {
    ...userQueries.query,
    ...observerQueries.query,
    ...messageQueries.query,
    ...chatRoomQueries.query
  },
  Mutation: {
    ...userMutations.mutation,
    ...observerMutations.mutation,
    ...messageMutations.mutation,
    ...chatRoomMutations.mutation
  },
  Subscription: {
    ...messageSubscriptions.subscription,
    ...audienceSubscriptions.subscription
  },
};



