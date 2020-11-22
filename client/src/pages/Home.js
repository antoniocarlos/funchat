import React, { useState, useCallback } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useLazyQuery } from '@apollo/client'
import { Link } from 'react-router-dom'



const LOGIN_OBSERVER = gql`
  query observerLogin($observerName: String!) {
    observerLogin(observerName: $observerName) {
      observerName
      token
  }
}
`

const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default function Home(props) {

  const [variables, setVariables] = useState({
    email: '',
    password: '',
    observerName: '',
  })

  const [errors, setErrors] = useState({})

  const [loginObserver, { loading: loadingObserver }] = useLazyQuery(LOGIN_OBSERVER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      localStorage.setItem('token', data.observerLogin.token)
      props.history.push('/chats')
    },
  })

  const [loginUser, { loading: loadingUser }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      localStorage.setItem('token', data.login.token)
      props.history.push('/chats')
    },
  })


  const submitObserverLoginForm = (e) => {
    e.preventDefault()
    loginObserver({ variables })
  }

  const submitUserLoginForm = (e) => {
    e.preventDefault()
    loginUser({ variables })
  }

  return (
    <>
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Observador</h1>
          <Form onSubmit={submitObserverLoginForm}>
            <Form.Group>
              <Form.Label className={errors.observerName && 'text-danger'}>
                {errors.observerName ?? 'Apelido de observador'}
              </Form.Label>
              <Form.Control
                type="text"
                value={variables.observerName}
                className={errors.observerName && 'is-invalid'}
                onChange={(e) =>
                  setVariables({ ...variables, observerName: e.target.value })
                }
              />
            </Form.Group>
            <div className="text-center">
            <Button variant="success" type="submit" disabled={loadingObserver}>
                {loadingObserver ? 'Carregando..' : 'Entrar'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Usuário cadastrado</h1>
          <Form onSubmit={submitUserLoginForm}>
            <Form.Group>
              <Form.Label className={errors.email && 'text-danger'}>
                {errors.email ?? 'email'}
              </Form.Label>
              <Form.Control
                type="text"
                value={variables.email}
                className={errors.email && 'is-invalid'}
                onChange={(e) =>
                  setVariables({ ...variables, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.password && 'text-danger'}>
                {errors.password ?? 'Senha'}
              </Form.Label>
              <Form.Control
                type="password"
                value={variables.password}
                className={errors.password && 'is-invalid'}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
              />
            </Form.Group>
            <div className="text-center">
            <Button variant="success" type="submit" disabled={loadingUser}>
                {loadingUser ? 'carregando..' : 'Entrar'}
              </Button>
              <br />
              <small>
                Não tem uma conta? <Link to="/register">Registrar</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}