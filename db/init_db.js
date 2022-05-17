const {
  client,
  //add all other functions needed here.
} = require("./");


const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  createProduct
} = require("./models");
const {
  productsToAdd,
  ordersToCreate,
  // cartToCreate,
  usersToCreate,
} = require("./seedData");


async function dropTables() {
	console.log('Dropping All Tables...');
	// drop all tables, in the correct order

	try {
		console.log('Starting to drop tables...');

		// have to make sure to drop in correct order
		await client.query(`
        
    DROP TABLE IF EXISTS cart CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
		
        
      `);

		console.log('Finished dropping tables!');
	} catch (error) {
		console.error('Error dropping tables!');
		throw error;
	}
}

async function buildTables() {
  try {
 
    console.log('Starting to build tables...');

    // build tables in correct order
    await client.query(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        role VARCHAR(255)
      );

      CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description VARCHAR(255) NOT NULL,
  stock INTEGER NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(255),
  "reviewStar" INTEGER
);


CREATE TABLE orders (
  id SERIAL PRIMARY KEY, 
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  zipcode VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  phone INTEGER NOT NULL,
  total INTEGER NOT NULL
);


    `);

    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}


// CREATE TABLE cart (
//   id SERIAL PRIMARY KEY, 
//   "userId" REFERENCES users(id),
//   "productId" REFERENCES products(id),
//   "ordersId" REFEREENCES orders(id),
//   "priceAtTimeOfPurchase" INTEGER NOT NULL,
//   quantity INTEGER NOT NULL
// );

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    const products = await Promise.all(productsToAdd.map(createProduct));

    console.log("products created:");
    console.log(products);

    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

// async function createInitialOrders() {
//   console.log("Starting to create orders...");
//   try {
//     const users = await Promise.all(ordersToCreate.map(createOrders));

//     console.log("Users created:");
//     console.log(users);
//     console.log("Finished creating users!");
//   } catch (error) {
//     console.error("Error creating users!");
//     throw error;
//   }
// }

// async function createInitialCarts() {
//   try {
//     console.log("starting to create the cart...");
//     // const [ user1, user2, user3 ] = await  AddFunctionThatRetrievesUserInfo
//     // const [ product1, product2, product3  ] = await AddFunctionThatRetrievesProductInfo
//     // const [ order1, order2, order3  ] = await AddFunctionThatRetrievesOrderInfo -orderId needs to match userinfo.
//     const carts = await Promise.all(cartToCreate.map(createCarts));

//     console.log("Carts created:");
//     console.log("Finished creating carts!");
//   } catch (error) {
//     console.error("Error creating carts!");
//     throw error;
//   }
// }

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await createInitialUsers();
    // await createInitialProducts();
    await createInitialOrders();
    // await createInitialCarts();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
