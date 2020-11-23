import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_CHATROOM = gql`
  query getChatRoom($chatRoom: String!) {
    getChatRoom(chatRoom: $chatRoom){
      name
      users{
        userName
      }
      observers{
        observerName
      }
      messages{
        content
        createdAt
      }
    }
  }
`

export default function Chat() {

  const [users, setUsers] = useState([]);
  const [observers, setObservers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { params } = useRouteMatch();

  // const [enterChat, { loading }] = useLazyQuery(GET_CHATROOM, {
  //   onError: (err) => console.log("err    *** " + JSON.stringify(err)),
  //   onCompleted(data) {
  //     console.log(data)
  //     setUsers(data.users);
  //     setObservers(data.Observers);
  //     setMessages(data.Messages);
  //   },
  // })

  const variable = params.chatRoom;

  const { loading, error, data } = useQuery(GET_CHATROOM, {
    variables: { chatRoom: variable },
  });

  useEffect(() => {
    console.log(JSON.stringify(data))
  }, [data]);

  return (
    <Row className="bg-white">
      <Col>
        <p>User</p>
        {loading ? <p>LOading...</p> : data.getChatRoom.users.map((user) => (
          <p key={user}>{user.userName}</p>
        ))}
        <p>Observer</p>
        {data.getChatRoom.observers.map((observer) => (
          <p key={observer}>{observer.observerName}</p>
        ))}
        <p>Message</p>
        {data.getChatRoom.messages.map((message) => (
          <p key={message}>{message.content}</p>
        ))}
      </Col>
    </Row>
  )
}