class ListChatRoomService {
  constructor(repository) {
    this.chatRoomRepository = repository;
  }

  async listAll() {
    const chatRooms = await this.chatRoomRepository.findAllWithAssociations();
    return chatRooms;
  }

  async findByChatRoomName(name) {
    const chatRoom = await this.chatRoomRepository.findByNameWithAssociations(
      name,
    );
    return chatRoom;
  }
}

export default ListChatRoomService;
