const { ChatRoom } = require('../../../infra/database/models');
const { Message, User, Observer } = require('../../../infra/database/models')

class ChatRoomRepository {
  constructor() {

  }

  async create({
    name
  }) {
    const chatRoom = await ChatRoom.create({
      name
    });

    return chatRoom.toJSON();
  }

  async findByName(name) {
    const chatRoom = await ChatRoom.findOne({ where: { name } });    
    return chatRoom ? chatRoom.toJSON() : null;
  }

  async findByNameWithAssociations(name) {
    const chatRoom = await ChatRoom.findOne({ 
      where: { name },
      order: [[ 'messages', 'createdAt', 'DESC']],
      include: [
        { model: User, as: 'users' },
        { model: Observer, as: 'observers' },
        { model: Message, as: 'messages' }
      ],
    });
    
    return chatRoom ? chatRoom.toJSON() : null;
  }

  async findAllWithAssociations() {
    const chatRooms = await ChatRoom.findAll({ 
      include: [
        { model: User, as: 'users' },
        { model: Observer, as: 'observers' },
        { model: Message, as: 'messages' }
      ]
    });
    return chatRooms;
  }

  convert(obj) {
    const convertedObj = {
      createdAt: obj.createdAt.toISOString(),
      updatedAt: obj.updatedAt.toISOString()
    }

    return convertedObj;
  }
}

module.exports = ChatRoomRepository