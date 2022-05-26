const client = require("../client");



async function getProductById(id) {

    try {
      const { rows: [ product ]  } = await client.query(`
        SELECT *
        FROM product
        WHERE id=$1;
      `, [id]);
  
      return product;
    } catch (error) {
      throw error;
    }
}

async function getAllProducts() {
  try {
    const { rows: product } = await client.query(`
          SELECT *
          FROM product;
        `);

    return product;
  } catch (error) {
    throw error;
  }
}



// async function updateProduct({ id, name, description }) {
//   try {
//     const {
//       rows: [product],
//     } = await client.query(
//       `
//         UPDATE product
//         SET name=$1, description=$2
//         WHERE id=$3
//         RETURNING *
//       `, [name, description, id])
//       return product;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  getProductById,
  getAllProducts,

//   updateProduct
};