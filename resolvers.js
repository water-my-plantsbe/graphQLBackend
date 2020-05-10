const {
  generateToken,
  authenticate,
  validUser,
  validUserId,
} = require("./auth/auth");
const bcrypt = require("bcryptjs");

exports.resolvers = {
  Query: {
    getAllUsers: async (root, args, { User }) => {
      const allUsers = await User.find();
      return allUsers;
    },
  },
  Mutation: {
    signInUser: async (root, { username, password }, { User }) => {
      let currentUser = null;
      let Response = { token: "", success: false };
      if (!username && !password) {
        Response = Object.assign({}, Response, {
          message: "Please provide required info",
        });
        return Response;
      } else {
        currentUser = await User.findBy(username);
        if (currentUser.length > 0) {
          // check if password is valid
          let userPassword = currentUser.map((pass) => pass.password);
          if (bcrypt.compareSync(password, userPassword[0])) {
            let token = await generateToken({ username, password });
            Response = Object.assign({}, Response, {
              message: "Login Successfull",
              token,
              success: true,
            });
            return Response;
          } else {
            Response = Object.assign({}, Response, {
              message: "Invalid credential",
            });
            return Response;
          }
        } else {
          Response.message = "No user found";
          return Response;
        }
      }
      return Response;
    },

    signUpUser: async (
      root,
      { username, password, email, phone },
      { User }
    ) => {
      let Response = { token: "", success: false, message: "" };
      // check if required field's are provided
      if (!username && !password && !email) {
        Response = Object.assign({}, Response, {
          message: "Please Provide all required field",
        });
        return Response;
      } else {
        // find if user exist
        let existingUser = await User.findByEmail(email);
        if (existingUser.length > 0) {
          Response = Object.assign({}, Response, {
            message: "Your email already registered, try to login",
          });
          return Response;
          // check if username available
        } else {
          let takenUsername = await User.findBy(username);
          if (takenUsername.length > 0) {
            Response = Object.assign({}, Response, {
              message: "This username not available, try with a different one",
            });
            return Response;
          } else {
            //hash password firse
            const hashedPassword = bcrypt.hashSync(password, 3);
            // create a new user
            let newUser = await User.addUser({
              username,
              email,
              password: hashedPassword,
              phone,
            });
            if (newUser) {
              let token = await generateToken({ username, password });
              Response = Object.assign({}, Response, {
                message: "Registration Successful",
                success: true,
                token,
              });
            } else {
              Response = Object.assign({}, Response, {
                message: "Registration Failed, try again",
              });
            }
          }
        }
        return Response;
      }
    },
  },
};
