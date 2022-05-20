const express = require("express");
const userRouter = express.Router();
const { createUser, getUser } = require("../db/users");
const jwt = require("jsonwebtoken");

userRouter.use((req, res, next) => {
    console.log("A request is being made to /user route")
    next();
});

userRouter.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (password.length < 8) {
            next(error);
            return;
        }
        const user = await createUser ({ username, password });

        const token = jwt.sign(
            {
                id: user.id,
                username,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1w",
            }
        );

        res.send({
            message: "Thank you for signing up!",
            token,
            user,
        });
    } catch ({ name, message }) {
        next({ name, message });
    }
})

userRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await getUser({ username, password });
        console.log(password, user, "Password Check");
        if(user) {
            const token =jwt.sign(
                {
                    id: user.id, 
                    username, 
                },

                process.env.JWT_SECRET

            );
            res.send({ message: "You are logged in!", token, user });
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect",
            });
        }
    } catch ({ name, message }) {
        next({ name: "error", message: "Unable to log in user!" });
    }
});

module.exprots = userRouter;