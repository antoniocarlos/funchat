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
    onCompleted(data) {
      console.log('Sucesso!')
    },
  })

  const logout = () => {
    if (entity.type === "observer") {
      logoffObserver({ observerName: entity.name });
    }
    dispatch({ type: 'LOGOUT' })
    history.push('/')
  }

  const { data } = useQuery(GET_CHATROOMS)

  const submitSearchField = (e) => {
    e.preventDefault()
    history.push(`/chat/${searchField}`)
  }

  return (
    <Fragment>

      <Row className="bg-white justify-content-around mb-2">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="link" onClick={logout}>
          Logout
        </Button>
      </Row>

      <Row className="bg-white p-2 justify-content-center mb-2">
        <Col sm={10} md={10} lg={10}>
          <Form.Row className="align-items-" onSubmit={submitSearchField}>
            <Col xs="auto" md={8}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Criar ou entrar em uma sala"
                  value={searchField}
                  onChange={(e) =>
                    setSearchField(e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col xs="auto" className="text-center">
              <Button variant="success" type="submit">
                {'Procurar'}
              </Button>
            </Col>
          </Form.Row>
        </Col>
      </Row>

      {data && data.getChatRooms.map((chatRoom) => (
        <Row className="bg-white mb-2" >
          <Col xs={8} key={chatRoom.name}>
            <Link to={`/chat/${chatRoom.name}`} >{chatRoom.name}</Link>
          </Col>
        </Row>
      ))}
    </Fragment>
  )
}