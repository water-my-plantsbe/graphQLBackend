import { gql } from "apollo-boost";

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
