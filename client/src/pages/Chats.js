import React, { Fragment, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

import { useAuthDispatch, useAuthState } from '../context/auth'

const GET_CHATROOMS = gql`
  query getChatRooms {
    getChatRooms{
      name
    }
  }
`

const LOGOFF_OBSERVER = gql`
  query observerLogoff($observerName: String!) {
    observerLogoff(observerName: $observerName) {
      observerName
  }
}
`

export default function Chats({ history }) {
  const [searchField, setSearchField] = useState("");
  const dispatch = useAuthDispatch()

  const { entity } = useAuthState();

  const [logoffObserver] = useLazyQuery(LOGOFF_OBSERVER, {
    onError: (err) => console.log("err " + JSON.stringify(err)),
    onCompleted(data) {
      console.log('Deslogado!')
      dispatch({ type: 'LOGOUT' })
      history.push('/')
    },
  })


  const logout = () => {
    if (entity.type === "observer") {
      logoffObserver({ variables :{ observerName: entity.name} });
    }
  }

  const { data } = useQuery(GET_CHATROOMS)

  const submitSearchField = (e) => {
    e.preventDefault()
    console.log("test")
    history.push(`/chat/${searchField}`)
  }

  return (
    <Fragment>

      <Row className="mb-2">
        <Button
          variant="light"
          onClick={logout}
        >Logout</Button>

      </Row>

      <Row className="p-2 justify-content-center mb-5">
        <Col sm={10} md={8} lg={8}>
          <Form onSubmit={submitSearchField}>
            <Form.Group className="d-flex align-items-center m-0">
              <Form.Control
                type="text"
                className="message-input rounded-pill p-4 bg-secondary border-0"
                placeholder="Encontrar ou criar uma sala"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <i
                className="fas fa-paper-plane fa-2x text-primary ml-2"
                onClick={submitSearchField}
                role="button"
              ></i>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {data && data.getChatRooms.map((chatRoom) => (
        <Row className="justify-content-center mb-2" key={chatRoom.name}>
          <Col sm={10} md={8} lg={8}>
            <Button href={`/chat/${chatRoom.name}`}
              variant="secondary"
              size="lg"
              block>
              {chatRoom.name}
            </Button>
          </Col>
        </Row>
      ))}
    </Fragment>
  )
}