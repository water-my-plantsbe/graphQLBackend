import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import WithSession from "./components/auth/WithSession";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  },
});

const AppWithSession = WithSession(App);
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <AppWithSession />
    </React.StrictMode>
    ,
  </ApolloProvider>,
  document.getElementById("root")
);
