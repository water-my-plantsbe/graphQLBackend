const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const { merge } = require("lodash");
const SECRET = process.env.JWT_SECRET || "keep it secret, keep it safe";
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
//get current user
const getUser = (token) => {
  let currentUser = null;
  if (token !== null && token !== "null") {
    try {
      currentUser = jwt.verify(token, SECRET);
    } catch (err) {
      console.log(err);
    }
  }
  return currentUser;
};
//----
const graphQLServer = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: merge(resolvers),
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const currentUser = getUser(token);
    return { User, Plant, currentUser };
  },
});

const path = "/graphql";
graphQLServer.applyMiddleware({
  app: server,
  path,
});

module.exports = server;
