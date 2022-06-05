const client  = require("../client");


async function createOrder({
    userId,
    email,
    street,
    city,
    state,
    zipcode,
    country,
    phone
    
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
                INSERT INTO orders("userId",email,street,city,state,zipcode,country,phone)
                VALUES ($1, $2, $3, $4, $5, $6,$7,$8)
                RETURNING *;
            `,
      [userId,email,street,city,state,zipcode,country,phone]
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
    const { rows } = await client.query(
			`
            SELECT *, orders.id as id
                FROM orders 
				JOIN users
				ON users.id = orders.id
                WHERE "userId"=$1;
            `,
			[ userId ]
		);
    
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
