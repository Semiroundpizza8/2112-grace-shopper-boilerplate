
const express = require('express');
const usersRouter = express.Router();
const { getUser, getAllUsers } = require('../db/models/user');


usersRouter.use((req, res, next) => {
	console.log('A request is being made to /users');

	next();
});

usersRouter.get('/', async (req, res) => {
	const users = await getUser();

	res.send({ users });
});

usersRouter.get('/me', async (req, res) => {
	const users = await getUser();
	res.send(users);
});



usersRouter.get(`/admin/users`, async (req, res, next) => {
	
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


module.exports = usersRouter;