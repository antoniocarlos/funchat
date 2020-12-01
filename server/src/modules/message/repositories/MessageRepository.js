const { Message } = require('../../../infra/database/models');

class MessageRepository {
  async create({ userId, sender, content, chatRoomId }) {
    try {
      const message = await Message.create({
        userId,
        sender,
        content,
        chatRoomId,
      });
      return this.convertMessage(message);
    } catch (err) {
      console.log(`err ${JSON.stringify(err)}`);
    }
  }

  async findBySender(userId) {
    const messages = await Message.findAll({ where: { userId } });
    const JSONMessages = messages.map(message => this.convertMessage(message));
    return JSONMessages;
  }

  async findAllByChatroom(chatRoomId) {
    const messages = await Message.findAll({ where: { chatRoomId } });
    const JSONMessages = messages.map(message => this.convertMessage(message));
    return JSONMessages;
  }

  async findAll() {
    const messages = await Message.findAll();
    const JSONMessages = messages.map(message => this.convertMessage(message));
    return JSONMessages.reverse();
  }

  convertMessage(message) {
    const convertedMessage = {
      ...message.toJSON(),
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    };

    return convertedMessage;
  }
}

export default MessageRepository;
