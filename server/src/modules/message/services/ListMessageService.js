class ListMessageService {
  constructor(repository) {
    this.messageRepository = repository;
  }

  async listAll() {
    try {
      const messages = await this.messageRepository.findAll();
      return messages;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  async getMessagesByChatRoom({ chatRoom }) {
    try {
      const messages = await this.messageRepository.findAllByChatroom(chatRoom);
      return messages;
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}

export default ListMessageService;
