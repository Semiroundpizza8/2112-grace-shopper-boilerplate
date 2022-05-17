const { client } = require("../client");

async function createProduct({
  name,
  description,
  stock,
  price,
  reviewStars,
  category,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
                INSERT INTO products(name, description, stock, price, reviewStars, category),
                VALUES ($1, $2, $3, $4, $5),
                ON CONFLICT(name) DO NOTHING,
                RETURNING *;
            `,
      [name, description, stock, price, reviewStars, category]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
};
