const client  = require("../client");

// addActivityToRoutine({ routineId, activityId, count, duration })
// create a new routine_activity, and return it

const addProductsToOrder = async ({ orderId, productId, priceAtTimeOfPurchase, quantity }) => {
	try {
		const { rows: [ order_products ] } = await client.query(
			`
            INSERT INTO orderProducts("orderId", "productId", priceAtTimeOfPurchase, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
			[ orderId, productId, priceAtTimeOfPurchase, quantity ]
		);

		return order_products;
	} catch (error) {
		throw error;
	}
};

module.exports = addProductsToOrder