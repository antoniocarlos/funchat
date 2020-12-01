import { UserInputError } from 'apollo-server';

class CreateMessageService {
  constructor(messageRepository,userRepository,chatRoomRepository) {
    this.messageRepository = messageRepository;
    this.userRepository = userRepository;
    this.chatRoomRepository = chatRoomRepository;
  }

  async create({ sender, content, chatRoomName }) {
    const errors = {};

    try {
      // Validate input data
      if (sender.trim() === '') {
        errors.sender = 'O remetente deve ser preenchido';
      }
      if (content.trim() === '') {
        errors.content = 'O conteúdo da mensagem deve ser preenchido';
      }
      if (chatRoomName.trim() === '') {
        errors.chatRoom = 'A chat room deve ser informado';
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      // Check if users exists
      const user = await this.userRepository.findByName(sender);
      if (!user) errors.userName = 'Usuário não encontrado';

      const name = chatRoomName;
      // Check if chatRoom exists
      let chat = await this.chatRoomRepository.findByName(name);

      if (!chat) {
        chat = await this.chatRoomRepository.create({ name });
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const message = await this.messageRepository.create({
        sender: user.userName,
        userId: user.id,
        content,
        chatRoomId: chat.id,
      });

      return message;
    } catch (err) {
      console.log(`err${JSON.stringify(err)}`);
      throw new UserInputError('Bad input', { errors });
    }
  }
}

export default CreateMessageService;
