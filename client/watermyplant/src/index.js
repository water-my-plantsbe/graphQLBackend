import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: "http://localhost:5000/graphql",
  cache,
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  },
  fetchOptions: {
    credentials: "include",
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </ApolloProvider>,
  document.getElementById("root")
);
