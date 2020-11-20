import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useLazyQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $username, password: $password) {
      userName
      email
      createdAt
      token
    }
  }
`

export default function Home(props) {

  const [variables, setVariables] = useState({
    email: '',
    password: '',
  })
  
  const [errors, setErrors] = useState({})

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      localStorage.setItem('token', data.login.token)
      props.history.push('/chats')
    },
  })

  const submitLoginForm = (e) => {
    e.preventDefault()

    loginUser({ variables })
  }

  return (
    <>
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Entrar como observador</h1>
          <Form onSubmit={}>
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
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? 'loading..' : 'Entrar como observador'}
              </Button>
              <br />
            </div>
          </Form>
        </Col>
      </Row>


      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Login</h1>
          <Form onSubmit={submitLoginForm}>
            <Form.Group>
              <Form.Label className={errors.email && 'text-danger'}>
                {errors.email ?? 'Email'}
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
                {errors.password ?? 'Password'}
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
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? 'loading..' : 'Entrar'}
              </Button>
              <br />
              <small>
                Don't have an account? <Link to="/register">Register</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}