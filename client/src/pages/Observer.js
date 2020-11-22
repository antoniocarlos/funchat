import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/client'

import gql from 'graphql-tag'

const LOGIN_OBSERVER = gql`
  query observerLogin($observerName: String) {
    observerLogin(observerName: $observerName) {
      observerName
      token
  }
}
`


export default function Observer(props) {

  const [observerVariables, setObserverVariables] = useState({
    observerName: ''
  })

  const [errors, setErrors] = useState({})

  const [loginObserver, { loadingObserver }] = useLazyQuery(LOGIN_OBSERVER, {
    onError: (err) => console.log(err.graphQLErrors),
    onCompleted(data) {
      localStorage.setItem('token', data.login.token)
      props.history.push('/chats')
    },
  })

  const submitObserverLoginForm = (e) => {
    e.preventDefault()
    console.log("submitObserverLoginForm")
    console.log(observerVariables)
    loginObserver({ observerVariables })
  }
  return (

    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Observador</h1>
        <Form onSubmit={submitObserverLoginForm}>
          <Form.Group>
            <Form.Label className={errors.observerName && 'text-danger'}>
              {errors.observerName ?? 'Observer Name'}
            </Form.Label>
            <Form.Control
              type="text"
              value={observerVariables.observerName}
              className={errors.observerName && 'is-invalid'}
              onChange={(e) =>
                setObserverVariables({ ...observerVariables, observerName: e.target.value })
              }
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit" disabled={loadingObserver}>
              {loadingObserver ? 'loading..' : 'Login'}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>


  )
}