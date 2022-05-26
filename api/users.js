const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUser,
  getUserById,
} = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (password.length < 8) {
      throw new Error("Password is too short");
    }
    const _user = await getUserByUsername(username);
    if (_user) {
      throw new Error({ message: "Username already taken" });
    }

    const user = await createUser({
      username,
      password,
    });
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({ token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  res.send(req.user);
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params;
  try {
      console.log("got here", username);
    const userPublicRoutines = await getPublicRoutinesByUser(
      {username: username}
    );
      console.log(userPublicRoutines)
    res.send(userPublicRoutines);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;