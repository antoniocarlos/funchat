const { AuthenticationError } = require('apollo-server')

const ChatRoomRepository = require('./repositories/ChatRoomRepository');
const CreateChatRoomService = require('./services/CreateChatRoomService');
const UserRepository = require('../user/repositories/UserRepository');
const ObserverRepository = require('../observer/repositories/ObserverRepository');
const ChatRoomDoorService = require('./services/ChatRoomDoorService');

const chatRoomRepository = new ChatRoomRepository();
const createChatRoomService = new CreateChatRoomService(chatRoomRepository);
const userRepository = new UserRepository();
const observerRepository = new ObserverRepository();
const chatRoomDoorService = new ChatRoomDoorService(chatRoomRepository, userRepository, observerRepository);






module.exports = {
  mutation: {
    createChatRoom: async (_, args) => {
      const chatRoom = await createChatRoomService.create(args);
      return chatRoom;
    },
    checkoutChatRoom: async (_, { chatRoom: chatRoom_ }, { auth, pubsub }) => {
      try {
        if (!auth) throw new AuthenticationError('Unauthenticated');

        const { audience } = await chatRoomDoorService.closeTheDoor(chatRoom_, auth.type, auth.name);
        pubsub.publish('UPDATE_AUDIENCE', { updateAudience: audience })

        return audience
      } catch (err) {
        throw err
      }
    }
  }
}