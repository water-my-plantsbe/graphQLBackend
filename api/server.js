const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

///graphQL
const { ApolloServer } = require("apollo-server-express");
const User = require(".././data/userModel");
const Plant = require("../data/plantsModel");
const { typeDefs } = require("../typeDefs");
const { resolvers } = require("../resolvers");

// Rest
const login = require("../router/login.js");
const register = require("../router/register.js");
const users = require("../router/users.js");
const plants = require("../router/plants.js");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/login", login);
server.use("/api/register", register);
server.use("/api/users", users);
server.use("/api/plants", plants);

server.get("/", (req, res) => {
  res.send("server is up");
});

const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { User, Plant };
  },
});

const path = "/graphql";
graphQLServer.applyMiddleware({
  app: server,
  path,
});

module.exports = server;
