const { GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const Type = require("./type");

const query = require('./query');
const mutation = require('./mutation');

const messageQueries = {
  getMessages: {
    type: GraphQLList(Type),
    resolve: query.getMessages
  },
  getMessagesByChatRoom: {
    type: GraphQLList(Type),
    resolve: query.getMessagesByChatRoom,
    args: {
      chatRoom: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  },
};

const messageMutations = {
  creatMessage: {
    type: Type,
    resolve: mutation.createMessage,
    args: {
      sender: {
        type: new GraphQLNonNull(GraphQLString)
      },
      content: {
        type: GraphQLNonNull(GraphQLString)
      },
      chatRoomName: {
        type: GraphQLNonNull(GraphQLString)
      }
    }
  }
};

module.exports = {messageQueries, messageMutations};