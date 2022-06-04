const client  = require("../client");


const getAllCarts = async () => {
	try {
		const { rows } = await client.query(
			`
            SELECT *
                FROM cart
            `
		);

		return rows;
	} catch (error) {
		throw error;
	}
};


const getCartById = async (cartId) => {
	try {
		const { rows: [ cart ] } = await client.query(
			`
            SELECT *
                FROM cart
                WHERE id=$1;
            `,
			[ cartId ]
		);

		return cart;
	} catch (error) {
		throw error;
	}
};

const getCartByUserId = async (userId) => {
	try {
		const { rows: [ cart ] } = await client.query(
			`
            SELECT *
                FROM cart
                WHERE "userId"=$1;
            `,
			[ userId ]
		);

		return [cart];
	} catch (error) {
		throw error;
	}
};

const addCartProductsToCart = async ({ userId, cartProductId }) => {
	try {
		const { rows:  [cart]  } = await client.query(
			`
            INSERT INTO cart("userId", "cartProductId")
            VALUES ($1, $2)
            RETURNING *;
        `,
	        [ userId, cartProductId ]
		);
        console.log("inside cart",cart);
		return cart;
	} catch (error) {
		throw error;
	}
};


const deleteCart = async (id) => {
	try {
		const { rows: [cart] } = await client.query(
			`
            DELETE FROM cart
            WHERE id=$1
			RETURNING *
        `,
			[ id ]
		);

		return cart;

	
	} catch (error) {
		throw error;
	}

};






module.exports = {getAllCarts, addCartProductsToCart, deleteCart, getCartById, getCartByUserId}