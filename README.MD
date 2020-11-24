## 🔥 FunChat

Seja bem vindo ao FumChat!

O FunChat é uma aplicação de salas de bate-papo simples e direta ao ponto. Você não precisa se cadastro para ver as conversas nem para criar novas salas. Basta fornecer um apelido de observador.

Por meio de subscriptios o sistema atualiza a lista de participantes assim como as mensagens enviadas em cada sala 

![Screenshot](docs/funChat_6.gif)


 Mas apenas usuários logados conseguem mandar mensagens.


![Screenshot](docs/funChat_4.gif)


Os tokens de validação não expiram. Uma vez logado você pode sair e voltar tranquilamente.

![Screenshot](docs/funChat_1.gif)

![Screenshot](docs/funChat_2.gif)

![Screenshot](docs/funChat_3.gif)

O formulário de login e de registro possuem validação para confirmar o preenchimento dos dados

![Screenshot](docs/funChat_5.gif)

As salas são criadas dinamicamente, basta procurar por uma ou digitar no caminho “localhost/chat/novasala” para criar uma nova.


### 📚 Documentação da API:

O sistema é servido por uma API graphQL baseada em Apollo server

Tipos

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

type ChatRoom {
  id: String!
  name: String!
  messages: [Message]
  users: [User]
  observers: [Observer]
  createdAt: String!
}

type Message {
  uuid: String!
  userId: String!
  sender: String!
  content: String!
  chatRoomId: String!
  createdAt: String!
}

type Audience {
  chatRoomIdEnter: String!
  chatRoomIdOut: String!
  user: User
  observer: Observer
}

Mutations

Cria um usuário

type Mutation {
  register(
    userName: String!
    email: String!
    birthDate: String!
    imageUrl: String
    password: String!
    confirmPassword: String!
  ): User!
}

Cria uma nova mensagem

type Mutation {
  createMessage(
    sender: String!
    content: String!
    chatRoomName: String!
  ): Message!
}

Cria um novo chatRoom

type Mutation {
  createChatRoom(name: String!): ChatRoom!
}

Lista os usuários cadastrados

type Query {
  getUsers: [User]
}

Loga com um usuário cadastrado

type Query {
  login(email: String!, password: String!): User
}

Lista os observadores

type Query {
  getObservers: [Observer]
}

Loga com um observador

type Query {
  observerLogin(observerName: String!): Observer
}

Desloga um observador

type Query {
  observerLogoff(observerName: String!): Observer
}

Lista todas as mensagens

type Query {
  getMessages: [Message]
}


Lista todos os chatRooms

type Query {
  getChatRooms: [ChatRoom]
}

Devolve todos os dados presentes em um chatRoom

type Query {
  getChatRoom(chatRoom: String!): ChatRoom
}

Subscription chamada toda vez que uma nova mensagem é enviada

type Subscription {
  newMessage: Message!
}

Subscription chamada toda vez que um usuário ou observador muda de chatRoom

type Subscription {
  updateAudience: Audience!
}


### 🤖 Tecnologias usadas

apollo/client/server
graphql
subscriptions-transport-ws
jest
react-bootstrap
node-sass
bcryptjs
jsonwebtoken
mysql2
sequelize

### 💻Configurando o projeto

Tanto na pasta client quanto na pasta server execute o yarn.

Por meio de um docker instancie um servidor mysql:5.7

Configure o sequelize para as variáveis de seu ambiente:
'src', 'infra', 'database','config', 'database.js'

na pasta do servidor execute:
sequelize db:migrate

Modifique o arquivo .env_example com a chave de segredo para a decodificação dos tokens e mude o seu nome para .env

Dando partida no servidor:
yarn dev

Iniciando o cliente:
yarn start
