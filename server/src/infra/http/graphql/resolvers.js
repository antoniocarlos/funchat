import userQueries from '../../../modules/user/query';
import observerQueries from '../../../modules/observer/query';
import messageQueries from '../../../modules/message/query';
import chatRoomQueries from '../../../modules/chatRoom/query';

import userMutations from '../../../modules/user/mutation';
import messageMutations from '../../../modules/message/mutation';
import chatRoomMutations from '../../../modules/chatRoom/mutation';

import messageSubscriptions from '../../../modules/message/subscription';
import audienceSubscriptions from '../../../modules/audience/subscription';

const resolvers = {
  Query: {
    ...userQueries,
    ...observerQueries,
    ...messageQueries,
    ...chatRoomQueries,
  },
  Mutation: {
    ...userMutations,
    ...messageMutations,
    ...chatRoomMutations,
  },
  Subscription: {
    ...messageSubscriptions,
    ...audienceSubscriptions,
  },
};

export default resolvers;
