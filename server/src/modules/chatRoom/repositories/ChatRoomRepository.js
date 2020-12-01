import {
  ChatRoom,
  Message,
  User,
  Observer,
} from '../../../infra/database/models';

class ChatRoomRepository {
  // constructor() {}

  async create({ name }) {
    const chatRoom = await ChatRoom.create({
      name,
    });

    return chatRoom.toJSON();
  }

  async findByName(name) {
    const chatRoom = await ChatRoom.findOne({ where: { name } });
    return chatRoom ? chatRoom.toJSON() : null;
  }

  async findByNameWithAssociations(name) {
    try {
      const chatRoom = await ChatRoom.findOne({
        where: { name },
        order: [['messages', 'createdAt', 'DESC']],
        include: [
          { model: User, as: 'users' },
          { model: Observer, as: 'observers' },
          { model: Message, as: 'messages' },
        ],
      });

      const messages = chatRoom
        .toJSON()
        .messages.map(message => this.convertMessage(message));

      const convertedChatRoom = {
        ...chatRoom.toJSON(),
        messages,
      };

      return convertedChatRoom;
    } catch (err) {
      console.log(`err ${JSON.stringify(err)}`);
    }
    return null;
  }

  convertMessage(message) {
    const convertedMessage = {
      ...message,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    };

    return convertedMessage;
  }

  async findAllWithAssociations() {
    const chatRooms = await ChatRoom.findAll({
      include: [
        { model: User, as: 'users' },
        { model: Observer, as: 'observers' },
        { model: Message, as: 'messages' },
      ],
    });
    return chatRooms;
  }

  convert(obj) {
    const convertedObj = {
      createdAt: obj.createdAt.toISOString(),
      updatedAt: obj.updatedAt.toISOString(),
    };

    return convertedObj;
  }
}

export default ChatRoomRepository;
