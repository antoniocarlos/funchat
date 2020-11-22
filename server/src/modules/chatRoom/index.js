const { GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const Type = require("./type");

const query = require('./query');
const mutation = require('./mutation');

const chatRoomQueries = {
  getChatRooms: {
    type: GraphQLList(Type),
    resolve: query.getChatRooms
  },
  getChatRoom: {
    type: Type,
    resolve: query.getChatRoom,
    args: {
      chatRoom: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  }
};

const chatRoomMutations = {
  creatChatRoom: {
    type: Type,
    resolve: mutation.createChatRoom,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  }
};

module.exports = {chatRoomQueries, chatRoomMutations};