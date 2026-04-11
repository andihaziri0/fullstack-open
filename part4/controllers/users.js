const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async ( _ , response) => {
  const users = await User.find({});
  response.json(users)
})

usersRouter.post("/", async (request, response, next) => {
  try {
    if (!request.body.username || !request.body.password) {
      return response
        .status(400)
        .json({ error: "username and password are required" });
    }
    if (request.body.username.length < 3 || request.body.password.length < 3) {
      return response
        .status(400)
        .json({
          error: "username and password must be at least 3 characters long",
        });
    }

    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
