const client  = require("../client");

// addActivityToRoutine({ routineId, activityId, count, duration })
// create a new routine_activity, and return it

const addProductsToOrder = async ({ orderId, productId, price, quantity }) => {
	try {
		const { rows:  order_products  } = await client.query(
			`
            INSERT INTO orderProducts("orderId", "productId", price, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
			[ orderId, productId, price, quantity ]
		);
        console.log("inside order_products",order_products);
		return order_products;
	} catch (error) {
		throw error;
	}
};

module.exports = addProductsToOrder