class ListMessageService {

  constructor(repository) {
    this.messageRepository = repository;
  }

  async listAll () {
    try {
      const messages = await this.messageRepository.findAll();
      return messages
    } catch (err) {
      console.log(err);
    }
  }

  async getMessagesByChatRoom ({ chatRoom }) {
    try {
      const messages = await this.messageRepository.findAllByChatroom(chatRoom);
      return messages
    } catch (err) {
      console.log(err);
    }
  }
}


module.exports = ListMessageService;