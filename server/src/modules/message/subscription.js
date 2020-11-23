module.exports = {
  subscribe: (_, __, { pubsub }) => {
    console.log('test *********************')
    return pubsub.asyncIterator(['NEW_MESSAGE'])
  }
}

    