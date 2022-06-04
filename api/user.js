const express = require("express");
const userRouter = express.Router();
const { getUser, getAllUsers, createUser } = require('../db/models/user');
const jwt = require("jsonwebtoken");


userRouter.post("/register", async (req, res, next) => {
    const { username, password, email, firstname, lastname, role } = req.body;
    console.log("are we in register")

    try {
        if (password.length < 8) {
            return;
        }
        const user = await createUser ({ username, password, email, firstname, lastname, role });

        
            const token =jwt.sign(
                {
                    id: user.id, 
                    username, 
                },

            process.env.JWT_SECRET,

            {
                expiresIn: "1w",
            }
        );
console.log(token, "token in register")
        res.send({
            message: "Thank you for signing up!",
            token: token,
            user: user,
        });

    } catch ( error ) {
        next( error );
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
    } catch (error) {
        console.error(error)
        next({ name: "error", message: "Unable to log in user!" });
    }
});

userRouter.get('/debug', async (req, res) => {
	const users = await getAllUsers();

	res.send({ users });
});

userRouter.get('/', async (req, res) => {
	const users = await getUser();

	res.send({ users });
});

userRouter.get('/me', async (req, res) => {
	const users = await getUser();
	res.send(users);
});



userRouter.get(`/admin/users`, async (req, res, next) => {
	
	const {token, username, password} = req.params;
	req.header(token);

	const user = await getUser({ username, password });
	if (user.role === "admin") {
		try {
		const allUsers = await getAllUsers();
		res.send(allUsers);
		} 
		catch ({ name, message }) {
			next({ name, message });
		}
	} else {
		next({name: 'IncorrectUserError', message: 'You are not allowed to see this page'})
	}
});


module.exports = userRouter;