const ChatRoomRepository = require('./repositories/ChatRoomRepository');
const CreateChatRoomService = require('./services/CreateChatRoomService');

const chatRoomRepository = new ChatRoomRepository();
const createChatRoomService = new CreateChatRoomService(chatRoomRepository);

module.exports = {
  mutation: {
    createChatRoom: async (_, args) => {
      const chatRoom = await createChatRoomService.create(args);
      return chatRoom;
    }
  }
}