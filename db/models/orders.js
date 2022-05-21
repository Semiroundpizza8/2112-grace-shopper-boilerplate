const client  = require("../client");


async function createOrder({
    firstname,
    lastname,
    email,
    street,
    city,
    zipcode,
    country,
    phone,
    total
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
                INSERT INTO orders(firstname,lastname,email,street,city,zipcode,country,phone,total)
                VALUES ($1, $2, $3, $4, $5, $6,$7, $8, $9)
                RETURNING *;
            `,
      [firstname,lastname,email,street,city,zipcode,country,phone,total]
    );
    //console.log(product);
    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    // SELECT the report with id equal to reportId
    const { rows: orders } = await client.query(`
      SELECT * FROM orders
    `);
    
    // return the report
    console.log(orders)
    return orders;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllOrders
};
