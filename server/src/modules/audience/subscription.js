import { AuthenticationError } from 'apollo-server';

const updateAudience = {
  subscribe(_, __, { pubsub, auth }) {
    if (!auth) throw new AuthenticationError('Unauthenticated');
    return pubsub.asyncIterator(['UPDATE_AUDIENCE']);
  },
};

export default { updateAudience };
