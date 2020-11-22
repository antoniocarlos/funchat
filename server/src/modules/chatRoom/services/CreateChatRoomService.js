const { UserInputError } = require('apollo-server');

class CreateChatRoomService {

  constructor(chatRoomRepository) {
    this.chatRoomRepository = chatRoomRepository;
  }

  async create({
    name
  }) {
    let errors = {};

    try {
      // Validate input data
      if (name.trim() === '') {
        errors.chatRoomName = 'O nome da sala deve ser preenchido'
      }

      if (Object.keys(errors).length > 0) {
        throw errors
      }

      // Check if chatRoom exists
      const CheckChatRoomByName = await this.chatRoomRepository.findByName(name);
      if (CheckChatRoomByName) errors.chatRoomName = 'Esse nome de chat room já existe';

      if (Object.keys(errors).length > 0) {
        throw errors
      }

      // Creates a chatRoom on database
      const chatRoom = await this.chatRoomRepository.create({
        name
      });

      return chatRoom;

    } catch (err) {
      console.log("err " + JSON.stringify(err));
      throw new UserInputError('Bad input', { errors });
    }
  }

}



module.exports = CreateChatRoomService;