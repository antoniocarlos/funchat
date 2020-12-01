import { AuthenticationError } from 'apollo-server';

import MessageRepository from './repositories/MessageRepository';
import UserRepository from '../user/repositories/UserRepository';
import ChatRoomRepository from '../chatRoom/repositories/ChatRoomRepository';

import CreateMessageService from './services/CreateMessageService';

const messageRepository = new MessageRepository();
const userRepository = new UserRepository();
const chatRoomRepository = new ChatRoomRepository();

const createMessageService = new CreateMessageService(messageRepository, userRepository, chatRoomRepository);

async function createMessage(_, args, { auth, pubsub }) {
  if (!auth) throw new AuthenticationError('Unauthenticated');
  if (auth.type === 'observer')
    throw new AuthenticationError('Apenas usuários podem mandar mensagens');
  const message = await createMessageService.create(args);

  pubsub.publish('NEW_MESSAGE', { newMessage: message });
  return message;
}

export default { createMessage };
