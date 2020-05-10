const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Query {
    getAllUsers: [Users]
  }
  type Users {
    id: ID
    username: String!
  }

  type Mutation {
    signInUser(username: String!, password: String): Response
  }
  type Response {
    success: Boolean!
    token: String
    message: String
  }
`;
