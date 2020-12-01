import React, { Fragment, useState, useEffect } from 'react';
import { Navbar, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
import { useAuthState } from '../../context/auth'
import Message from './Message'

const GET_CHATROOM = gql`
  query getChatRoom($chatRoom: String!) {
    getChatRoom(chatRoom: $chatRoom){
      id
      name
      users{
        userName
        imageUrl
      }
      observers{
        observerName
      }
      messages{
        uuid
        sender
        content
        createdAt
      }
    }
  }
`

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
        uuid
        sender
        content
        createdAt
        chatRoomId
    }
  }
`

const UPDATE_AUDIENCE = gql`
  subscription updateAudience {
    updateAudience {
      chatRoomIdEnter
      chatRoomIdOut
      user{
        userName
        imageUrl
      }
      observer{
        observerName
      }
    }
  }
`

const CREATE_MESSAGE = gql`
  mutation createMessage($sender: String! $content: String! $chatRoomName: String!) {
    createMessage(sender: $sender content: $content chatRoomName: $chatRoomName){
    content
    uuid
    createdAt
    sender
    }
  }
`


const CHECKOUT_CHATROOM = gql`
  mutation checkoutChatRoom($chatRoom: String!) {
    checkoutChatRoom(chatRoom: $chatRoom){
      chatRoomIdEnter
      chatRoomIdOut
      user{
        userName
        imageUrl
      }
      observer{
        observerName
      }
    }
  }
`

export default function Chat(props) {

  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [observers, setObservers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('')

  const { entity } = useAuthState();
  const { params } = useRouteMatch();

  const chatRoomName = params.chatRoom;

  const { loading, error, data } = useQuery(GET_CHATROOM, {
    variables: { chatRoom: chatRoomName },
  });

  const [sendMessage] = useMutation(CREATE_MESSAGE, {
    onError: (err) => console.log(err),
  })

  const [checkoutChatRoom] = useMutation(CHECKOUT_CHATROOM, {
    onError: (err) => console.log(err),
    onCompleted: (_, __) => props.history.push('/chats'),
  })

  const handleCheckoutChatRoom = () => {
    checkoutChatRoom({ variables: { chatRoom: chatRoomName } });
  }

  useEffect(() => {
    if (error) {
      console.log("Erro ao pegar dados")
    }
    if (data) {
      setId(data.getChatRoom.id)
      setUsers(...users, data.getChatRoom.users)
      setObservers(...observers, data.getChatRoom.observers)
      setMessages(...messages, data.getChatRoom.messages)
    }
  }, [data, error]);

  const submitMessage = (e) => {
    e.preventDefault()

    if (content.trim() === '') return

    if (entity.type === "observer") return

    setContent('')

    sendMessage({ variables: { sender: entity.name, content, chatRoomName } })
  }


  //UpdateMessages
  const { data: updatedMessageData, error: updatedMessageError } = useSubscription(
    NEW_MESSAGE
  )

  useEffect(() => {

    if (updatedMessageError) {
      console.log("Erro ao receber mensagens")
    }
    if (updatedMessageData) {
      if (updatedMessageData.newMessage.chatRoomId === id) {
        const message = updatedMessageData.newMessage
        setMessages([message, ...messages])
      }
    }
  }, [updatedMessageData, updatedMessageError, setMessages, id]);


  //UpdateMessages
  const { data: updatedAudienceData, error: updatedAudienceError } = useSubscription(
    UPDATE_AUDIENCE
  )

  useEffect(() => {

    if (updatedAudienceError) {
      console.log("Erro ao receber audiência")
    }
    if (updatedAudienceData) {


      const user = updatedAudienceData.updateAudience.user
      const observer = updatedAudienceData.updateAudience.observer
      const chatRoomIdEnter = updatedAudienceData.updateAudience.chatRoomIdEnter
      const chatRoomIdOut = updatedAudienceData.updateAudience.chatRoomIdOut

      //verifica se é ele mesmo
      if (observer) {
        if (entity.type === "observer" && entity.name === observer.observerName) return
      }

      if (user) {
        if (entity.type === "user" && entity.name === user.userName) return
      }

      //Recarregamento de página?
      if (chatRoomIdEnter === chatRoomIdOut) return

      //A modificação deve ser feita nessa sala?
      if (chatRoomIdEnter !== id && chatRoomIdOut !== id) return


      // Entrada
      if (chatRoomIdEnter === id) {
        if (user) setUsers((old) => [user, ...old])
        if (observer) setObservers((old) => [observer, ...old])

      }

      //Saida
      if (chatRoomIdOut === id) {
        if (user) setUsers((old) => [...old.filter(user_ => user_.userName !== user.userName)])
        if (observer) setObservers((old) => [...old.filter(observer_ => observer_.observerName !== observer.observerName)])
      }

    }

  }, [updatedAudienceData, updatedAudienceError, setUsers, setObservers, id]);

  return (
    <Fragment>
      <Navbar fixed="top" className="bg-white shadow">
        <p class="navbar-brand">FunChat</p>
        <Button
          variant="light"
          onClick={handleCheckoutChatRoom}
          className="ml-auto"
        >Sair da sala</Button>
      </Navbar>


      <Row className='bg-light shadow rounded mt-5'>
        <Col xs={12} md={8} className="p-0 messenger rounded">
          <div className="messages-box d-flex flex-column-reverse p-3 ">

            {loading ? <p>Loading...</p> : messages.map((message, index) => (
              <Fragment key={message.uuid}>
                <Message message={message} />
                {index === messages.length - 1 && (
                  <div className="invisible">
                    <hr className="m-0" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>


          <div className="px-3 py-2 ">
            <Form onSubmit={submitMessage}>
              <Form.Group className="d-flex align-items-center m-0">
                <Form.Control
                  type="text"
                  className="message-input rounded-pill p-4 bg-white border-0 shadow-lg"
                  placeholder={entity.type === "observer" ? "Faça login para mandar mensagens" : "Escreva uma mensagem "}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <i
                  className="fas fa-paper-plane fa-2x text-primary ml-2"
                  onClick={submitMessage}
                  role="button"
                ></i>
              </Form.Group>
            </Form>
          </div>
        </Col>

        <Col xs={12} md={4} className="p-0 bg-light rounded">
          <div className="audience-box d-flex flex-column">
            <div
              className={'audience-info-header user-div justify-content-start p-3 border-bottom'}
            >
              <p className="text-success">Usuários</p>
              <p className="font-weight-light">
                {users.length === 1 ? "Um usuário logado" : ` ${users.length} usuários logados`}
              </p>
            </div>

            {users && users.length > 0 ? users.map((user) => (
              <div key={user.userName} className={'d-flex p-3 bg-white border-bottom'}>
                <Image
                  src={
                    user.imageUrl ||
                    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                  }
                  className="user-image"
                />
                <div className="ml-3">
                  <p className="text-success">{user.userName}</p>
                  <p className="font-weight-light">
                    {'Logado'}
                  </p>
                </div>
              </div>
            )) : <div></div>}

            <div
              className={'audience-info-header justify-content-start p-3 border-bottom'}
            >

              <p className="text-success">Expectadores</p>
              <p className="font-weight-light">
                {observers.length === 1 ? "Um espectador" : ` ${observers.length} expectadores`}
              </p>

            </div>

            {observers && observers.length > 0 ? observers.map((observer) => (
              <div key={observer.observerName} className={'d-flex p-3 bg-white border-bottom'}>
                <Image
                  src={
                    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                  }
                  className="user-image"
                />
                <div className="ml-3">
                  <p className="text-success">{observer.observerName}</p>
                  <p className="font-weight-light">
                    {'Não logado'}
                  </p>
                </div>
              </div>
            )) : <div></div>}
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}
