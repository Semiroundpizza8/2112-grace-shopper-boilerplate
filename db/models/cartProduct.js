const client  = require("../client");


const getAllCartProducts = async () => {
	try {
		const { rows } = await client.query(
			`
            SELECT *
                FROM cartproducts
            `
		);

		return rows;
	} catch (error) {
		throw error;
	}
};

const getCartProductById = async (cartId) => {
	try {
		const { rows: [ cartProducts ] } = await client.query(
			`
            SELECT *
                FROM cartproducts
                WHERE id=$1;
            `,
			[ cartId ]
		);

		return cartProducts;
	} catch (error) {
		throw error;
	}
};

const getCartProductByUserId = async (userId) => {
	console.log("userIdInDB", userId);
	try {
		const { rows } = await client.query(
			`
            SELECT *
                FROM cartproducts 
				JOIN products
				ON products.id = cartproducts."productId"
                WHERE "userId"=$1;
            `,
			[ userId ]
		);
console.log("rows in modules", rows)
		return rows;
	} catch (error) {
		throw error;
	}
};



const createCartProduct = async ({ userId, productId, price, quantity }) => {
	try {
		const { rows : cart  } = await client.query(
			`
            INSERT INTO cartproducts("userId", "productId", price, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
	        [ userId, productId, price, quantity ]
		);
        
		return cart;
	} catch (error) {
		throw error;
	}
};


const updateCartProduct = async (fields = { price, quantity }) => {
	const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

	try {
		if (setString.length > 0) {
			const { rows: [ newUpdate ] } = await client.query(
				`    
              UPDATE cartproducts
              SET ${setString}
              WHERE id= ${fields.id} 
              RETURNING *;
            `,
				Object.values(fields)
			);

			return newUpdate;
		}
	} catch (error) {
		throw error;
	}
};



const deleteCartProduct = async (id) => {
	try {
		const { rows: [product] } = await client.query(
			`
            DELETE FROM cartproducts
            WHERE id=$1
			RETURNING *
        `,
			[ id ]
		);

		return product;

	
	} catch (error) {
		throw error;
	}

};






module.exports = {getAllCartProducts, createCartProduct, updateCartProduct, deleteCartProduct, getCartProductById, getCartProductByUserId}