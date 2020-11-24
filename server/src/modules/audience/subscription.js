const { AuthenticationError } = require('apollo-server')

module.exports = {
  subscription: {
    updateAudience: {
      subscribe: (_, __, { pubsub, auth }) => {
        if (!auth) throw new AuthenticationError('Unauthenticated')
        return pubsub.asyncIterator(['UPDATE_AUDIENCE'])
      }
    },
  }
}

