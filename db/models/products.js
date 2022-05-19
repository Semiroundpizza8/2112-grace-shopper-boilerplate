const client  = require("../client");


async function createProduct({
  name,
  image,
  description,
  stock,
  price,
  reviewstars,
  category,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
                INSERT INTO products(name, image, description, stock, price, reviewstars, category)
                VALUES ($1, $2, $3, $4, $5, $6,$7)
                ON CONFLICT(name) DO NOTHING
                RETURNING *;
            `,
      [name, image, description, stock, price, reviewstars, category]
    );
    console.log(product);
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    // SELECT the report with id equal to reportId
    const { rows: [products] } = await client.query(`
      SELECT * FROM products
    `);
    
    // return the report
    console.log(products)
    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts
};
