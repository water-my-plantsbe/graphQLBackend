const express = require("express");
const router = express.Router();
const userDb = require("../data/userModel.js");
const { authenticate, validUser, validUserId } = require("../auth/auth.js");
// get all the users
router.get("/", authenticate, async (req, res) => {
  await userDb
    .find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// delete a user by id
router.delete("/:id", authenticate, validUserId, validUser, (req, res) => {
  const id = req.params.id;
  userDb.deleteUser(id).then((confirm) => {
    res.status(200).json({ message: `${confirm} id deleted` });
  });
});
// get a user by id
router.get("/:id", authenticate, validUserId, validUser, async (req, res) => {
  try {
    const user = await userDb.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: `there was an error: ${err}` });
  }
});
// update user info
router.put("/:id", authenticate, validUserId, validUser, async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const { id } = req.params;
    if (!username) {
      res
        .status(400)
        .json({
          message: "Please provide all the required information of the user.",
        });
    }
    const count = await userDb.update(id, req.body).then((user) => {
      if (user) {
        res.status(200).json(req.body);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: `there was an error accessing the db: ${err}` });
  }
});

module.exports = router;
