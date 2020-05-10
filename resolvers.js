const {
  generateToken,
  authenticate,
  validUser,
  validUserId,
} = require("./auth/auth");
exports.resolvers = {
  Query: {
    getAllUsers: async (root, args, { User }) => {
      const allUsers = await User.find();
      return allUsers;
    },
  },
  Mutation: {
    signInUser: async (root, { username, password }, { User }) => {
      let Response = { token: "", success: false };
      if (username && password) {
        currentUser = await User.findBy(username);
      }
      if (currentUser.length > 0) {
        let token = await generateToken({ username, password });
        Response = Object.assign({}, Response, {
          message: "Login Successfull",
          token,
          success: true,
        });
      } else {
        Response.message = "No user found";
        return Response;
      }
      return Response;
    },
  },
};
