const { GraphQLString, GraphQLList, GraphQLInputObjectType, GraphQLNonNull } = require('graphql');
const Type = require("./type");

const query = require('./query');
const mutation = require('./mutation');

const observerQueries = {
  getObservers: {
    type: GraphQLList(Type),
    resolve: query.getObservers
  },
  observerLogin: {
    type: Type,
    resolve: query.observerLogin,
    args: {
      observerName: {
        type: new GraphQLNonNull(
          GraphQLString
        )
      }
    }
  },
  observerLogoff: {
    type: Type,
    resolve: query.observerLogoff,
    args: {
      observerName: {
        type: new GraphQLNonNull(
          GraphQLString
        )
      }
    }
  }
};

const observerMutations = {
  registerObserver: {
    type: Type,
    resolve: mutation.register,
    args: {
      observerName: {
        type: new GraphQLNonNull(
          GraphQLString
        )
      }
    }
  }
};
    
module.exports = {observerQueries, observerMutations};