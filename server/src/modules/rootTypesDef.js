const userTypesDef = require('./user/type');
const observerTypesDef = require('./observer/type');
const { gql } = require('apollo-server');

module.exports = gql`{
  ${{...userTypesDef,
  ...observerTypesDef}}
}
`;