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
