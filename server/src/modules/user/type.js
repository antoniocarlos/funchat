const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    userName: String!
    email: String!
    birthDate: String!
    createdAt: String!
    updatedAt: String!
    token: String
  }
  type Query {
    getUsers: [User]!
    login(email: String!, password: String!): User!
  }
  type Mutation {
    register(
      userName: String!
      email: String!
      birthDate: String!
      password: String!
      confirmPassword: String!
      imageUrl: String
    ): User!
  }
`;
