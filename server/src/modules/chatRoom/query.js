const { AuthenticationError } = require('apollo-server')

const ChatRoomRepository = require('./repositories/ChatRoomRepository');
const UserRepository = require('../user/repositories/UserRepository');
const ObserverRepository = require('../observer/repositories/ObserverRepository');

const ListChatRoomService = require('./services/ListChatRoomService');
const ChatRoomDoorService = require('./services/ChatRoomDoorService');

const chatRoomRepository = new ChatRoomRepository();
const userRepository = new UserRepository();
const observerRepository = new ObserverRepository();

const listChatRoomService = new ListChatRoomService(chatRoomRepository);
const chatRoomDoorService = new ChatRoomDoorService(chatRoomRepository, userRepository, observerRepository);

module.exports = {
  query: {
    getChatRooms: async () => {
      return await listChatRoomService.listAll();
    },
    getChatRoom: async (_, { chatRoom: chatRoom_ }, { auth, pubsub }) => {
      try {
        console.log("er ********" + auth)
        if (!auth) throw new AuthenticationError('Unauthenticated');

        const { chatRoom, audience } = await chatRoomDoorService.openTheDoor(chatRoom_, auth.type, auth.name);
        pubsub.publish('UPDATE_AUDIENCE', { updateAudience: audience })

        return chatRoom
      } catch (err) {
        console.log("err ********")
        throw err
      }
    }
  }
}
