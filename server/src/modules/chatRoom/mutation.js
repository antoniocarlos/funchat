import { AuthenticationError } from 'apollo-server';

import ChatRoomRepository from './repositories/ChatRoomRepository';
import CreateChatRoomService from './services/CreateChatRoomService';
import UserRepository from '../user/repositories/UserRepository';
import ObserverRepository from '../observer/repositories/ObserverRepository';
import ChatRoomDoorService from './services/ChatRoomDoorService';

const chatRoomRepository = new ChatRoomRepository();
const createChatRoomService = new CreateChatRoomService(chatRoomRepository);
const userRepository = new UserRepository();
const observerRepository = new ObserverRepository();
const chatRoomDoorService = new ChatRoomDoorService(
  chatRoomRepository,
  userRepository,
  observerRepository,
);

async function createChatRoom(_, args) {
  const chatRoom = await createChatRoomService.create(args);
  return chatRoom;
}

async function checkoutChatRoom(_, { chatRoom: chatRoom_ }, { auth, pubsub }) {
  if (!auth) throw new AuthenticationError('Unauthenticated');

  const { audience } = await chatRoomDoorService.closeTheDoor(
    chatRoom_,
    auth.type,
    auth.name,
  );
  pubsub.publish('UPDATE_AUDIENCE', { updateAudience: audience });

  return audience;
}

export default { createChatRoom, checkoutChatRoom };
