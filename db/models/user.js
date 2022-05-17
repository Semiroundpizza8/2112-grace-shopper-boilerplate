// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');


async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
	try {
		const { rows: [ user ] } = await client.query(
			`
            SELECT * FROM users
        `,
		);

		return user;
	} catch (error) {
		throw error;
	}

}



const createUser = async ({ username, password }) => {
	try {
		console.log('creating user....');

		const SALT_COUNT = 10;
		const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

		const { rows: [ user ] } = await client.query(
			`
                INSERT INTO users (username, password) 
                VALUES($1, $2) 
                ON CONFLICT (username) DO NOTHING 
                RETURNING username,id;
              `,
			[ username, hashedPassword ]
		);

		password = hashedPassword;

		return user;
	} catch (error) {
		throw error;
	}
};


const getUser = async ({ username, password }) => {
	try {
		const user = await getUserByUsername(username);
		const hashedPassword = user.password;
		const verifyPassword = await bcrypt.compare(password, hashedPassword);

		if (verifyPassword) {
			delete user.password;
			return user;
		} else {
			return '';
		}
	} catch (error) {
		throw error;
	}
};


const getUserById = async (id) => {
	const { rows: [ user ] } = await client.query(
		`
    SELECT * FROM users 
    where id = $1`,
		[ id ]
	);

	return user;
};


const getUserByUsername = async (username) => {
	try {
		const { rows: [ user ] } = await client.query(
			`
            SELECT * FROM users
            where username = $1;
        `,
			[ username ]
		);

		return user;
	} catch (error) {
		throw error;
	}
};

module.exports = { createUser, getUser, getUserById, getUserByUsername, getAllUsers };