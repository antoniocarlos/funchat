const { gql } = require('apollo-server');

module.exports = gql`
  type Observer {
    observerName: String!
    createdAt: String!
    updatedAt: String!
    token: String
  }
  type Query {
    getObservers: [Observer]!
    observerLogin(observerName: String!): Observer!
    observerLogoff(observerName: String!): Observer!
  }
  type Mutation {
    register(): Observer!
  }
`;
