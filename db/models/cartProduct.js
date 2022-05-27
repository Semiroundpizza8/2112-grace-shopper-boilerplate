const client  = require("../client");


const getAllCartProducts = async () => {
	try {
		const { rows } = await client.query(
			`
            SELECT *
                FROM cartProducts
            `
		);

		return cart_products;
	} catch (error) {
		throw error;
	}
};

const getCartProductById = async (cartId) => {
	try {
		const { rows: [ cart_products ] } = await client.query(
			`
            SELECT *
                FROM cartProducts
                WHERE id=$1;
            `,
			[ cartId ]
		);

		return cart_products;
	} catch (error) {
		throw error;
	}
};

const getCartProductByUserId = async (userId) => {
	try {
		const { rows: [ cart_products ] } = await client.query(
			`
            SELECT *
                FROM cartProducts
                WHERE "userId"=$1;
            `,
			[ userId ]
		);

		return cart_products;
	} catch (error) {
		throw error;
	}
};

const addProductsToCartProduct = async ({ userId, productId, price, quantity }) => {
	try {
		const { rows:  cart_products  } = await client.query(
			`
            INSERT INTO cartProducts("UserId", "productId", price, quantity)
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


const updateProductInCartProduct = async (fields = { price, quantity }) => {
	const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

	try {
		if (setString.length > 0) {
			const { rows: [ newUpdate ] } = await client.query(
				`    
              UPDATE cartProducts
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
            DELETE FROM cartProducts
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






module.exports = {getAllCartProducts, addProductsToCartProduct, updateProductInCartProduct, deleteCartProduct, getCartProductById, getCartProductByUserId}