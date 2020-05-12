import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import WithSession from "./components/auth/WithSession";
const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache,
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
  fetchOptions: {
    credentials: "include",
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
