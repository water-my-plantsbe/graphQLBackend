const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { generateToken } = require("../auth/auth.js");
const Users = require("../data/userModel.js");

router.post("/", (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ Message: "please provide a username and password" });
    } else {
      Users.findBy({ username })
        .first()
        .then((user) => {
          // if (user && bcrypt.compareSync(password, user.password)) {
          if (
            (user && password === user.password) ||
            bcrypt.compareSync(password, user.password)
          ) {
            const token = generateToken(user);
            res.status(200).json({
              message: `Welcome ${user.username}!`,
              token,
              id: user.id,
            });
          } else {
            res.status(401).json({ message: "Invalid Credentials" });
          }
        });
    }
  } catch (error) {
    res.status(500).json({ message: `An error occured : ${error}` });
  }
});

module.exports = router;
