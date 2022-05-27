const client = require("../client");

async function createCartProduct({productId, cartId, quantity, price}){
  try{
    const { rows : [ cartProduct ] } = await client.query(`
      INSERT INTO cart_product ("productId", "cartId", quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [productId, cartId, quantity, price])
    return cartProduct;
  }catch(error){
    throw error;
  }
}
async function getCart_ProductById(id) {
  try {
    const { rows: [ cart_product ]  } = await client.query(`
      SELECT *
      FROM cart_product
      WHERE id=$1;
    `, [id]);

    return cart_product;
  } catch (error) {
    throw error;
  }
}


async function addProductToCart({
    productId,
    cartId,
    quantity,
    price,
}) 
  
  {
  try {
    if (!productId){
      return null;
    }
    if (!cartId){
      return null;
    }

    const {
      rows: [cart_product],
    } = await client.query(
      `
    INSERT INTO cart_product("productId", "cartId", quantity, price)
    VALUES ($1, $2, $3, $4) 
    ON CONFLICT ("productId", "cartId") DO NOTHING
    RETURNING *;
    `,
      [productId, cartId, quantity, price]
    );
    
    return cart_product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCart_Product({ productId, cartId, price, id }) {
  try {
    const {
      rows: [cart_product],
    } = await client.query(
      `
        UPDATE cart_product
        SET productId=$1, cartId=$2, price = $3,
        WHERE id=$4
        RETURNING *
      `, [productId, cartId, price, id]);
      return cart_product;
  } catch (error) {
    throw error;
  }
}

async function destroyCart_Product(id) {
  try {
    const {rows:[cart_product]} = await client.query(`
      DELETE FROM cart_product
      WHERE id=$1
      RETURNING *
    `, [id]);
    return cart_product
  } catch (error) {
    throw error;
  }
}

async function getTotalCartProductPrice(){
  try{
    const { rows: [ totalPrice ] } = await client.query(`
    SELECT price
    FROM product;
    RETURNING *;
    `)

    const totalCartPrice = 0;

    totalPrice.map(price => totalCartPrice+=price)

    return totalCartPrice;
  }catch(error){
    throw error;
  }
}

module.exports = {
  getCart_ProductById,
  addProductToCart,
  updateCart_Product,
  destroyCart_Product,
  createCartProduct
 
};