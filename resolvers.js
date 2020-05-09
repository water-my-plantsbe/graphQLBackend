const { authenticate, validUser, validUserId } = require("./auth/auth");
exports.resolvers = {
  Query: {
    getAllUsers: async (root, args, { User }) => {
      const allUsers = await User.find();
      return allUsers;
    },
  },
};
