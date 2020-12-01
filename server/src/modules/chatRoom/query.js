import { AuthenticationError } from 'apollo-server';

import ChatRoomRepository from './repositories/ChatRoomRepository';
import UserRepository from '../user/repositories/UserRepository';
import ObserverRepository from '../observer/repositories/ObserverRepository';

import ListChatRoomService from './services/ListChatRoomService';
import ChatRoomDoorService from './services/ChatRoomDoorService';

const chatRoomRepository = new ChatRoomRepository();
const userRepository = new UserRepository();
const observerRepository = new ObserverRepository();

const listChatRoomService = new ListChatRoomService(chatRoomRepository);
const chatRoomDoorService = new ChatRoomDoorService(
  chatRoomRepository,
  userRepository,
  observerRepository,
);

async function getChatRooms() {
  const chatRooms = await listChatRoomService.listAll();
  return chatRooms;
}

async function getChatRoom(_, { chatRoom: chatRoom_ }, { auth, pubsub }) {
  try {
    if (!auth) throw new AuthenticationError('Unauthenticated');

    const { chatRoom, audience } = await chatRoomDoorService.openTheDoor(
      chatRoom_,
      auth.type,
      auth.name,
    );
    pubsub.publish('UPDATE_AUDIENCE', { updateAudience: audience });

    return chatRoom;
  } catch (err) {
    console.log('err ');
    throw err;
  }
}

export default { getChatRooms, getChatRoom };
