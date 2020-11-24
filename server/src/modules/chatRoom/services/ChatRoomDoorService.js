const { UserInputError } = require('apollo-server');

class ChatRoomDoorService {

  constructor(chatRoomRepository, userRepository, observerRepository) {
    this.chatRoomRepository = chatRoomRepository;
    this.userRepository = userRepository;
    this.observerRepository = observerRepository;
  }

  async openTheDoor(chatRoomName, type, name) {
    let errors = {};

    try {

      let user = null;
      let observer = null;
      let chatRoomIdOut = null;

      if (type === "user") {
        user = await this.userRepository.findByName(name)
        if (!user) { errors.userName = 'Usuário não encontrado' };
        chatRoomIdOut = user.chatRoomId
      }

      if (type === "observer") {
        observer = await this.observerRepository.findByName(name)
        if (!observer) {errors.observerName = 'Observador não encontrado'};
        chatRoomIdOut = observer.chatRoomId
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
        await this.userRepository.updateChatRoom(name, chatRoom.id)
      }

      if (type === "observer") {
        await this.observerRepository.updateChatRoom(name, chatRoom.id)
      }

      chatRoom = await this.chatRoomRepository.findByNameWithAssociations(chatRoomName);

      const audience = {
        chatRoomIdEnter: chatRoom.id,
        chatRoomIdOut,
        user,
        observer,
      }

      return { chatRoom, audience }

    } catch (err) {
      console.log("err            " + JSON.stringify(err));
      throw new UserInputError('Bad input', { errors });
    }
  }
}

module.exports = ChatRoomDoorService;