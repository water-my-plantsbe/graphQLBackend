import { gql } from "apollo-boost";
// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      id
    }
  }
`;

// Plant queries

// User Mutation
export const SIGN_IN_USER = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
      success
      message
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation(
    $username: String!
    $password: String!
    $email: String!
    $phone: String
  ) {
    signUpUser(
      username: $username
      password: $password
      email: $email
      phone: $phone
    ) {
      token
      success
      message
    }
  }
`;

// Plant Mutation

export const ADD_PLANT = gql`
  mutation(
    $name: String!
    $description: String!
    $url: String
    $water_per_week: Int
    $sunlight: String
    $temperature: String
    $difficulty: String
    $size: String
    $last_water: String
  ) {
    addPlant(
      name: $name
      description: $description
      url: $url
      water_per_week: $water_per_week
      sunlight: $sunlight
      temperature: $temperature
      difficulty: $difficulty
      size: $size
      last_water: $last_water
    ) {
      success
    }
  }
`;
