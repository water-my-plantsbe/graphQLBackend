import { gql } from "apollo-boost";
import { Query } from "react-apollo";
// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
    }
  }
`;

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
