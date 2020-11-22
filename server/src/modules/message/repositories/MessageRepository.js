const { Message } = require('../../../infra/database/models');

class MessageRepository {
  constructor() {

  }

  async create({
    userId,
    content,
    chatRoomId
  }) {
    console.log(" --------         ")
    try {
      return await Message.create({
        userId,
        content,
        chatRoomId
      });
    } catch (err) {
      console.log(" --------         " + JSON.stringify(err))
    }

    //return this.convertMessage(message);
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
    const messages = await Messages.findAll();
    const JSONMessages = messages.map(message => this.convertMessage(message));
    return JSONMessages;
  }

  convertMessage(message) {
    const convertedMessage = {
      ...message.toJSON(),
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString()
    }

    return convertedMessage;
  }

}

module.exports = MessageRepository