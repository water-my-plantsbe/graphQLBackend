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
    addPlant(
      name: String!
      description: String!
      url: String
      water_per_week: Int
      sunlight: String
      temperature: String
      difficulty: String
      size: String
      last_water: String
    ): Plant
  }
  type Response {
    success: Boolean!
    token: String
    message: String
  }
  type Plant {
    success: Boolean
  }
`;
