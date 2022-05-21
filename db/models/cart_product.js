const client  = require("../client");

// addActivityToRoutine({ routineId, activityId, count, duration })
// create a new routine_activity, and return it

const addProductsToCart = async ({ userId, productId, price, quantity }) => {
	try {
		const { rows:  cart_products  } = await client.query(
			`
            INSERT INTO cartProducts("userId", "productId", price, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
	        [ userId, productId, price, quantity ]
		);
        console.log("inside cart_products",cart_products);
		return cart_products;
	} catch (error) {
		throw error;
	}
};

module.exports = addProductsToCart