import { gql } from '@apollo/client';

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

export const GET_CHATROOMS = gql`
  query getChatRooms {
    getChatRooms {
      name
      messages{
        content
        sender
      }
      users{
        userName
      }
      observers{
        observerName
      }
    }
  }
`;