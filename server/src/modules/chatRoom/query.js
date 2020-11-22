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
  getChatRooms: async () => {
    return await listChatRoomService.listAll();
  },
  getChatRoom: async (_, { chatRoom }, { auth }) => {
    try {
      if (!auth) throw new AuthenticationError('Unauthenticated');
      return await chatRoomDoorService.openTheDoor( chatRoom, auth.type, auth.name);
    }catch (err) {
      throw err
    }
  }
}
