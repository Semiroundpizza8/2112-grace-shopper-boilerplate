
const client= require('./client');
const { createOrder, getAllOrders } = require('./models/orders');


const {
  createProduct, getAllProducts
} = require("./models/products");

const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
} = require("./models/user");

const {
  productsToAdd,
 ordersToCreate,
  cartToCreate,
  usersToCreate,
} = require("./seedData");
const addProductsToOrder = require('./models/order_products');


async function dropTables() {
	console.log('Dropping All Tables...');
	// drop all tables, in the correct order

	try {
		console.log('Starting to drop tables...');

		// have to make sure to drop in correct order
		await client.query(`
        
    DROP TABLE IF EXISTS orderProducts;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
		
        
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
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        role VARCHAR(255)
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255),
        description VARCHAR(255) NOT NULL,
        stock INTEGER NOT NULL,
        price VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        reviewstars INTEGER
      );


      CREATE TABLE orders (
        id SERIAL PRIMARY KEY, 
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255)  NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        zipcode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        total VARCHAR(255) NOT NULL
      );

      CREATE TABLE orderProducts (
        id SERIAL PRIMARY KEY, 
        "orderId" INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        "productId" INTEGER REFERENCES products(id),
        priceAtTimeOfPurchase INTEGER,
        quantity INTEGER, 
        UNIQUE("orderId","productId")
      );

    `);

    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");

  try {
    const users = await Promise.all(usersToCreate.map(createUser));
console.log(usersToCreate)
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

async function createInitialOrders() {
  console.log("Starting to create orders...");
  try {
    const orders = await Promise.all(ordersToCreate.map(createOrder));

    console.log("Orders created:");
    console.log(orders);
    console.log("Finished creating orders!");
  } catch (error) {
    console.error("Error creating orders!");
    throw error;
  }
}

// async function createInitialCarts() {
//   try {
//     console.log("starting to create the cart...");
    
//     const [ product1, product2, product3, product4, product5, product6 ] = await getAllProducts();
//     const [ order1, order2, order3  ] = await getAllOrders();
//     const carts = await Promise.all(cartToCreate.map(addToCart));

//     console.log("Carts created:");
//     console.log("Finished creating carts!");
//   } catch (error) {
//     console.error("Error creating carts!");
//     throw error;
//   }
// }

async function createInitialOrderProducts() {
	try {
		console.log('starting to create order_products...');
		const [ orderSofa, orderDining, orderChair, orderBed ] = await getAllOrders();
		console.log('getAllOrders');
		const [ sofa1, sofa2, dining1, dining2, bed1, bed2, bed3, chair1, chair2 ] = await getAllProducts();

		const orderProductsToCreate = [
			{
				orderId: orderSofa.id,
				productId: sofa1.id,
				priceAtTimeOfPurchase: 10,
				quantity: 5
			},
			{
        orderId: orderSofa.id,
				productId: sofa2.id,
				priceAtTimeOfPurchase: 20,
				quantity: 50
			},
			{
        orderId: orderDining.id,
				productId: dining1.id,
				priceAtTimeOfPurchase: 100,
				quantity: 2
			},
			{
        orderId: orderDining.id,
				productId: dining2.id,
				priceAtTimeOfPurchase: 1200,
				quantity: 1
			},
			{
        orderId: orderBed.id,
				productId: bed1.id,
				priceAtTimeOfPurchase: 2000,
				quantity: 1
			},
			{
        orderId: orderBed.id,
				productId: bed2.id,
				priceAtTimeOfPurchase: 2500,
				quantity: 2
			},
			{
        orderId: orderBed.id,
				productId: bed3.id,
				priceAtTimeOfPurchase: 1500,
				quantity: 3
			},
			{
				orderId: orderChair.id,
				productId: chair1.id,
				priceAtTimeOfPurchase: 10,
				quantity: 5
			},
			{
        orderId: orderChair.id,
				productId: chair2.id,
				priceAtTimeOfPurchase: 10,
				quantity: 5
			}
		];
		const orderProducts = await Promise.all(orderProductsToCreate.map(addProductsToOrder));
		console.log('order_products created: ', orderProducts);
		console.log('Finished creating routines_activities!');
	} catch (error) {
		throw error;
	}
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    //await createInitialCarts();
    await createInitialOrderProducts();

  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
