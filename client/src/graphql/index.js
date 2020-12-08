import { gql } from '@apollo/client';

//Auth schemas
export const LOGOFF_OBSERVER = gql`
  query observerLogoff($observerName: String!) {
    observerLogoff(observerName: $observerName) {
      observerName
    }
  }
`;

export const LOGIN_OBSERVER = gql`
  query observerLogin($observerName: String!) {
    observerLogin(observerName: $observerName) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

