import { AuthenticationError } from 'apollo-server';

const newMessage = {
  subscribe(_, __, { pubsub, auth }) {
    if (!auth) throw new AuthenticationError('Unauthenticated');
    return pubsub.asyncIterator(['NEW_MESSAGE']);
  },
};

export default { newMessage };
