const { AuthenticationError, withFilter } = require('apollo-server')

module.exports = {
  subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub, auth }) => {
        if (!auth) throw new AuthenticationError('Unauthenticated')
        return pubsub.asyncIterator(['NEW_MESSAGE'])
      }
    },
  }
}

