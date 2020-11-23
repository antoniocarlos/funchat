const { AuthenticationError } = require('apollo-server');

const MessageRepository = require('./repositories/MessageRepository');
const UserRepository = require('../user/repositories/UserRepository');
const ChatRoomRepository = require('../chatRoom/repositories/ChatRoomRepository');
const CreateMessageService = require('./services/CreateMessageService');


const messageRepository = new MessageRepository();
const userRepository = new UserRepository();
const chatRoomRepository = new ChatRoomRepository();
const createMessageService = new CreateMessageService(messageRepository, userRepository, chatRoomRepository);

module.exports = {
  createMessage: async (_, args, { auth, pubsub }) => {
    try {
      if (!auth) throw new AuthenticationError('Unauthenticated');
      if (auth.type === "observer") throw new AuthenticationError('Apenas usuários podem mandar mensagens');
      const message = await createMessageService.create(args);

      pubsub.publish('NEW_MESSAGE', { newMessage: message })
      return message;
    } catch (err) {
      throw err
    }
  }
}