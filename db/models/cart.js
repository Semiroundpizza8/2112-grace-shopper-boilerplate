const client = require("../client");


async function getCartById(cartId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        SELECT *
        FROM cart
        WHERE id=$1;
      `,
      [cartId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}



// async function getAllcarts() {
//   try {
//     const { rows: cart } = await client.query(`
//         SELECT cart.*, users.username AS "creatorName"
//         FROM cart
//         JOIN users ON users.id=cart."creatorId";
//       `);
//     return cart;
//   } catch (error) {
//     throw error;
//   }
// }

async function createCart({ userId, isPayFor, price }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO cart("userId", price,"isPayFor" ) 
        VALUES($1, $2, $3) 
        RETURNING *;
      `,
      [userId, price, isPayFor]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCart({ id, isPayFor, name, price }) {

  try {
    const fields = {};
    if (name){
      fields.name = name
    }
    if (goal){
      fields.goal = goal
    }
    if (typeof isPublic === "boolean"){
      fields.isPublic = isPublic
    }

    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    const {
      rows: [cart],
    } = await client.query(
      `
        UPDATE cart, price
        SET ${ setString }
        WHERE id=${id}
        RETURNING *
      `, Object.values(fields))
      return cart;
  } catch (error) {
    throw error;
  }
}


// async function updateCartPrice({}){



// }



module.exports = {
  getCartById,
//   getAllCarts,
  createCart,
  updateCart,
//   updateCartPrice,
  
};