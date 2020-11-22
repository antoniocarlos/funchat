const { UserInputError } = require('apollo-server');

class ChatRoomDoorService {

  constructor(chatRoomRepository, userRepository, observerRepository) {
    this.chatRoomRepository = chatRoomRepository;
    this.userRepository = userRepository;
    this.observerRepository = observerRepository;
  }

  async openTheDoor( chatRoomName, type, name ) {
    let errors = {};

    try {
      let entity;
      
      if (type === "user") {
        entity = this.userRepository.findByName(name)
        if (!entity) errors.userName = 'Usuário não encontrado';
      }


      if (type === "observer") {
        entity = this.observerRepository.findByName(name)
        if (!entity) errors.observerName = 'Observador não encontrado';
      }

      if (Object.keys(errors).length > 0) {
        throw errors
      }

      let chatRoom = await this.chatRoomRepository.findByName(chatRoomName);
      if (!chatRoom) {
        chatRoom = await this.chatRoomRepository.create({
          name: chatRoomName
        });
      }

      if (type === "user") {
        await this.userRepository.updateChatRoom( name, chatRoom.id )
      }
      
      if (type === "observer") {
        await this.observerRepository.updateChatRoom( name, chatRoom.id )
      }
      chatRoom = await this.chatRoomRepository.findByNameWithAssociations(chatRoomName);
      return chatRoom
    } catch (err) {
      console.log("err" + JSON.stringify(err));
      throw new UserInputError('Bad input', { errors });
    }
  }
}

module.exports = ChatRoomDoorService;