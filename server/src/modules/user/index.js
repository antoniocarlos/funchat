// const { GraphQLString, GraphQLList, GraphQLInputObjectType, GraphQLNonNull } = require('graphql');
// const Type = require("./type");

// const query = require('./query');
// const mutation = require('./mutation');

// const userQueries = {
//   getUsers: {
//     type: GraphQLList(Type),
//     resolve: query.getUsers
//   },
//   login: {
//     type: Type,
//     resolve: query.login,
//     args: {
//       email: {
//         type: new GraphQLNonNull(
//           GraphQLString
//         )
//       },
//       password: {
//         type: new GraphQLNonNull(
//           GraphQLString
//         )
//       },
//     }
//   }
// };

// const userMutations = {
//   register: {
//     type: Type,
//     resolve: mutation.register,
//     args: {
//       userName: {
//         type: new GraphQLNonNull(
//           GraphQLString
//         )
//       },
//       email: {
//         type: new GraphQLNonNull(
//           GraphQLString
//         )
//       },
//       birthDate: {
//         type: new GraphQLNonNull(
//           GraphQLString
//         )
//       },
//       imageUrl: {
//         type: GraphQLString
//       },
//       password: {
//         type: new GraphQLNonNull(
//           GraphQLString
//         )
//       },
//       confirmPassword: {
//         type: new GraphQLNonNull(
//           GraphQLString
//         )
//       }
//     }
//   }
// };
    
// module.exports = {userQueries, userMutations};