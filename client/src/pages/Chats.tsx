import React, { useState, useCallback, useEffect } from 'react';
import { BsFillPersonFill, BsEyeFill, BsFillEnvelopeFill } from 'react-icons/bs';
import { Navbar, Row, Col, Form, Button, Card } from 'react-bootstrap';

import { History } from 'history';

import { useAuth } from '../hooks/auth';
import { useChatRoom } from '../hooks/chatRoom';

interface ChildComponentProps {
  history : History
}

interface Message {
  sender: string
  content: string
}

interface ChatRoom {
  name: string
  messages: Array<Message>
  users: []
  observers: []
}

const Chats: React.FC<ChildComponentProps> = ({ history }) => {
  const [searchField, setSearchField] = useState('');

  const { logoff } = useAuth();
  const { chatRooms, getChatRooms} = useChatRoom();

  useEffect(() => {
    getChatRooms();
  });

  const logout = () => {
    logoff();
    history.push('/');
  };

  const handleEnterChatRoom = useCallback((chatRoomName: string) => {
    history.push(`/chat/${chatRoomName}`);
  }, [history]);

  const submitSearchField = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    history.push(`/chat/${searchField}`);
  };

  return (
    <>

      <Navbar fixed="top" className="bg-white shadow">
        <p className="navbar-brand">FunChat</p>
        <Button
          className="ml-auto"
          variant="light"
          onClick={logout}
        >
          Logout
          </Button>
      </Navbar>


      <Row className="p-2 justify-content-center mt-5 mb-5">
        <Col sm={10} md={8} lg={8}>
          <Form onSubmit={e => submitSearchField(e)}>
            <Form.Group className="d-flex align-items-center m-0">
              <Form.Control
                type="text"
                className="shadow message-input rounded-pill p-4 bg-secondary border-0"
                placeholder="Encontrar ou criar uma sala"
                value={searchField}
                onChange={e => setSearchField(e.target.value)}
              />
              <i
                className="fas fa-paper-plane fa-2x text-primary ml-2"
                onClick={e => submitSearchField(e)}
                role="button"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center mb-2">
        <Col sm={10} md={8} lg={8}>

          {chatRooms &&
            chatRooms.map((chatRoom: ChatRoom) => (
              <Card
                className="text-grey mb-2 shadow" key={chatRoom.name}
              >
                <Card.Header as="h5">{chatRoom.name}</Card.Header>
                <Card.Body>
                  {
                    chatRoom.messages.length >= 1 ?
                      <>
                        <Card.Title>{chatRoom.messages.slice(-1)[0].sender}</Card.Title>
                        <Card.Text className="mb-3">
                          {`"${chatRoom.messages.slice(-1)[0].content}"`}
                        </Card.Text>
                      </>
                      :
                      <Card.Title>Sem mensagens</Card.Title>
                  }

                </Card.Body>
                <Card.Footer className="d-flex">
                  <div className="d-flex chats-card-footer-show">
                    <BsFillPersonFill className="card-icons" /><p className="">{chatRoom.users.length}</p>
                    <BsEyeFill className="card-icons" /><p className="">{chatRoom.observers.length}</p>
                    <BsFillEnvelopeFill className="card-icons" /><p className="">{chatRoom.messages.length}</p>
                  </div>
                  <Button variant="primary" className="ml-auto" onClick={() => handleEnterChatRoom(chatRoom.name)}>Entrar na sala</Button>
                </Card.Footer>
              </Card>
            ))}
        </Col>
      </Row>

    </>
  );
}

export default Chats;