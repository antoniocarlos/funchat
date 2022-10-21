import React, { Fragment, useState, useEffect, useCallback } from 'react';
import {
  Navbar,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import { History } from 'history';

import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface ChildComponentProps {
    history : History
}

const Home: React.FC<ChildComponentProps> = ({ history }) => {
  const [variables, setVariables] = useState({
    email: '',
    password: '',
    observerName: '',
  });

  const {
    entity,
    errors,
    loginObserver,
    loadingObserver,
    loginUser,
    loadingUser
  } = useAuth();

  useEffect(() => {
    if(entity) history.push('/chats');
  }, [entity])

  const submitObserverLoginForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginObserver({ variables });
  }, [loginObserver, variables]);

  const submitUserLoginForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({ variables });
  }, [loginUser, variables]);
  
  return (
    <Fragment>
      <Navbar fixed="top" className="bg-white shadow">
        <p className="navbar-brand">FunChat</p>
      </Navbar>

      <Row className="py-5 justify-content-center">
        <Col sm={8} md={6} lg={6}>
          <Row className="bg-white py-5 justify-content-center mb-3 shadow rounded">
            <Col sm={10} md={10} lg={10}>
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
                    onChange={e => setVariables({ ...variables, observerName: e.target.value })}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={loadingObserver}
                  >
                    {loadingObserver ? 'Carregando..' : 'Entrar'}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>

          <Row className="bg-white py-5 justify-content-center shadow rounded">
            <Col sm={10} md={10} lg={10}>
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
                    onChange={e => setVariables({ ...variables, email: e.target.value })}
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
                    onChange={e => setVariables({ ...variables, password: e.target.value })}
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
        </Col>
      </Row>
    </Fragment>
  );
}

export default Home