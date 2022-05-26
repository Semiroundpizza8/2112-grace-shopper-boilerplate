const client  = require("../client");

const getCartById = async (cartId) => {
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

const addProductsToCart = async ({ productId, price, quantity }) => {
	try {
		const { rows:  cart_products  } = await client.query(
			`
            INSERT INTO cartProducts("productId", price, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
	        [ productId, price, quantity ]
		);
        console.log("inside cart_products",cart_products);
		return cart_products;
	} catch (error) {
		throw error;
	}
};


const updateProductInCart = async (fields = { price, quantity }) => {
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



const deleteProductInCart = async (id) => {
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






module.exports = {addProductsToCart, updateProductInCart, deleteProductInCart, getCartById}