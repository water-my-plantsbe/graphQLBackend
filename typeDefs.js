const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Query {
    getAllUsers: [Users]
    getCurrentUser: Users
  }
  type Users {
    id: ID
    username: String!
    email: String
  }

  type Mutation {
    signInUser(username: String!, password: String!): Response
    signUpUser(
      username: String!
      password: String!
      email: String!
      phone: String
    ): Response
  }
  type Response {
    success: Boolean!
    token: String
    message: String
  }
`;
