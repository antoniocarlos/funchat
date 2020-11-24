const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    userName: String!
    email: String!
    birthDate: String!
    createdAt: String!
    updatedAt: String!
    token: String
    imageUrl: String
  }
  type Observer {
    observerName: String!
    createdAt: String!
    updatedAt: String!
    token: String
  }
  type Message {
    uuid: String!
    userId: String!
    sender: String!
    content: String!
    chatRoomId: String!
    createdAt: String!
  }
  type ChatRoom {
    id: String!
    name: String!
    messages: [Message]
    users: [User]
    observers: [Observer]
    createdAt: String!
  }
  type Audience {
    chatRoomIdEnter:String
    chatRoomIdOut:String
    user:User
    observer:Observer
  }
  type Query {
    getUsers: [User]
    login(email: String! password: String!): User
    getObservers: [Observer]
    observerLogin(observerName: String!): Observer
    observerLogoff(observerName: String!): Observer
    getMessages: [Message]
    getMessagesByChatRoom(chatRoom: String!): [Message]
    getChatRooms: [ChatRoom]
    getChatRoom(chatRoom: String!): ChatRoom
  }
  type Mutation {
    register(
      userName: String!
      email: String!
      birthDate: String!
      imageUrl: String
      password: String!
      confirmPassword: String!
    ): User!

    registerObserver(observerName: String!): Observer!
    
    createMessage(
      sender: String!
      content: String!
      chatRoomName: String!
    ): Message!

    createChatRoom(name: String!): ChatRoom!,

    checkoutChatRoom(chatRoom: String!): Audience!
  }
  type Subscription {
    newMessage: Message!
    updateAudience: Audience!
  }
`