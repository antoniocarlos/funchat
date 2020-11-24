const MessageRepository = require('./repositories/MessageRepository');
const ListMessageService = require('./services/ListMessageService');

const messageRepository = new MessageRepository();
const listMessageService = new ListMessageService(messageRepository);

module.exports = {
  query: {
    getMessages: async () => {
      return await listMessageService.listAll();
    },
    getMessagesByChatRoom: async (_, args) => {
      return await listMessageService.listByChatRoom(args);
    }
  }
}
