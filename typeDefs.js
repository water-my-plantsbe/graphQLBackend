const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Query {
    getAllUsers: [Users]
  }
  type Users {
    id: ID
    username: String!
  }
`;
