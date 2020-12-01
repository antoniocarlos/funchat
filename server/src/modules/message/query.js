import MessageRepository from './repositories/MessageRepository';
import ListMessageService from './services/ListMessageService';

const messageRepository = new MessageRepository();
const listMessageService = new ListMessageService(messageRepository);

async function getMessages() {
  const messages = await listMessageService.listAll();
  return messages;
}

async function getMessagesByChatRoom(_, args) {
  const messages = await listMessageService.listByChatRoom(args);
  return messages;
}

export default { getMessages, getMessagesByChatRoom };
