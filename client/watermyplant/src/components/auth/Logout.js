import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const handleSignout = (client, history) => {
  localStorage.setItem("token", "");
  client.resetStore();
  history.push("/login");
};
const LogOut = ({ history }) => (
  <ApolloConsumer>
    {(client) => {
      return (
        <button
          className="btn btn-signOut"
          onClick={() => handleSignout(client, history)}
        >
          {" "}
          Signout
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(LogOut);
