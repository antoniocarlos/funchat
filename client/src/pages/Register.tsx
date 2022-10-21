import React, { useState, useCallback } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import { History } from 'history';

import 'react-day-picker/lib/style.css';

interface ChildComponentProps {
  history : History
}

interface Erro {
  email?: string
  userName?: string
  birthDate?: string
  imageUrl?: string
  password?: string
  confirmPassword?: string
}

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $birthDate: String!
    $imageUrl: String
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      userName: $userName
      email: $email
      birthDate: $birthDate
      imageUrl: $imageUrl
      password: $password
      confirmPassword: $confirmPassword
    ) {
      userName
      email
      birthDate
      createdAt
      updatedAt
    }
  }
`;

const Register: React.FC<ChildComponentProps> = ({ history }) => {
  const [variables, setVariables] = useState({
    email: '',
    userName: '',
    birthDate: '',
    imageUrl: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Erro>({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: () => history.push('/'),
    onError: err => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const submitRegisterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerUser({ variables });
  };

  const handleFormSet = useCallback(
    (value: {[key: string]: string}) => {
      setVariables({ ...variables, ...value });
    },
    [setVariables, variables],
  );

  const handleChangeBirthDate = useCallback(
    (day: Date) => {
      setVariables({ ...variables, birthDate: day.toISOString() });
    },
    [setVariables, variables],
  );

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label className={errors.userName && 'text-danger'}>
              {!!errors.userName || 'Nome de usuário'}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.userName}
              className={errors.userName && 'is-invalid'}
              onChange={e => handleFormSet({ userName: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.email && 'text-danger'}>
              {!!errors.email || 'Email'}
            </Form.Label>
            <Form.Control
              type="email"
              value={variables.email}
              className={errors.email && 'is-invalid'}
              onChange={e => handleFormSet({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.birthDate && 'text-danger'}>
              {!!errors.birthDate || 'Data de nascimento'}
            </Form.Label>

            <div className="input-group mb-3 ">
              <div className="input-group-prepend">
                <span className="input-group-text">Date: </span>
              </div>
              <DayPickerInput
                inputProps={{ className: 'input-group form-control' }}
                onDayChange={day => handleChangeBirthDate(day)}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.imageUrl && 'text-danger'}>
              {!!errors.imageUrl || 'Url do avatar'}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.imageUrl}
              className={errors.imageUrl && 'is-invalid'}
              onChange={e => handleFormSet({ imageUrl: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.password && 'text-danger'}>
              {!!errors.password || 'Senha'}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.password}
              className={errors.password && 'is-invalid'}
              onChange={e => handleFormSet({ password: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.confirmPassword && 'text-danger'}>
              {!!errors.confirmPassword || 'Confirme a senha'}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.confirmPassword}
              className={errors.confirmPassword && 'is-invalid'}
              onChange={e => {
                handleFormSet({ confirmPassword: e.target.value });
                setVariables({
                  ...variables,
                  confirmPassword: e.target.value,
                })
              }}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'loading..' : 'Register'}
            </Button>
            <br />
            <small>
              Já tem uma conta? <Link to="/">Login</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
