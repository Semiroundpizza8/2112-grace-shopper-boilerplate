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
    
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
                INSERT INTO orders(email,street,city,zipcode,country,phone)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `,
      [email,street,city,zipcode,country,phone]
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
  getAllOrders,
  
};
