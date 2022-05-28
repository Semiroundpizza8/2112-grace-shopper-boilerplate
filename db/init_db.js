
const client= require('./client');
const { createOrder, getAllOrders } = require('./models/orders');
const { getAllCartProducts, createCartProduct } = require('./models/cartProduct');
const { getAllCarts, addCartProductsToCart } = require('./models/cart');


const {
  createProduct, getAllProducts
} = require("./models/products");

const {
  createUser,
  getAllUsers,
} = require("./models/user");

const {
  productsToAdd,
 ordersToCreate,
  usersToCreate,
} = require("./seedData");
const addProductsToOrder = require('./models/order_products');
const {addProductsToCart} = require('./models/cartProduct');


async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order

  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
        
    
    DROP TABLE IF EXISTS cartProducts CASCADE;
    DROP TABLE IF EXISTS cart CASCADE;
    DROP TABLE IF EXISTS orderProducts CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS creditCard CASCADE;
    DROP TYPE IF EXISTS status CASCADE;
    
        
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("Starting to build tables...");

    // build tables in correct order

    await client.query(`
    CREATE TABLE users (
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


      CREATE TYPE status AS ENUM ('inProgress', 'Purchased');
     
      CREATE TABLE orders (   
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE, 
        email VARCHAR(255)  NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        zipcode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        currentorder STATUS

      );

      CREATE TABLE cartProducts (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "productId" INTEGER REFERENCES products(id),
        price INTEGER,
        quantity INTEGER
      );

      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "cartProductId" INTEGER REFERENCES cartProducts(id)
      );

    

      CREATE TABLE creditCard (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "orderId" INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL, 
        cardtype  VARCHAR(50) NOT NULL,
        zipcode VARCHAR(255) NOT NULL,
        cardnumber VARCHAR(25) NOT NULL,
        cvv VARCHAR(255) NOT NULL,
        expdate VARCHAR(255) NOT NULL
      )

    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");

  try {
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log(usersToCreate);
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
//     const orders = await Promise.all(ordersToCreate.map(createOrder));

//     console.log("Orders created:");
//     console.log(orders);
//     console.log("Finished creating orders!");
//   } catch (error) {
//     console.error("Error creating orders!");
//     throw error;
//   }
// }

// async function createInitialOrderProducts() {
//   try {
//     console.log("starting to create order_products...");
//     console.log("getAllOrders", await getAllOrders());
//     console.log("getProducts", await getAllProducts());

//     const [orderSofa, orderDining, orderChair, orderBed] = await getAllOrders();
//     console.log("orderSofa", orderSofa);
//     console.log("orderDining", orderDining);

//     const [sofa1, sofa2, dining1, dining2, bed1, bed2, bed3, chair1, chair2] =
//       await getAllProducts();
//     console.log("dining", dining1);

//     const orderProductsToCreate = [
//       {
//         orderId: orderSofa.id,
//         productId: sofa1.id,
//         price: 10,
//         quantity: 5,
//       },
//       {
//         orderId: orderSofa.id,
//         productId: sofa2.id,
//         price: 20,
//         quantity: 50,
//       },
//       {
//         orderId: orderDining.id,
//         productId: dining1.id,
//         price: 100,
//         quantity: 2,
//       },
//       {
//         orderId: orderDining.id,
//         productId: dining2.id,
//         price: 1200,
//         quantity: 1,
//       },
//       {
//         orderId: orderBed.id,
//         productId: bed1.id,
//         price: 2000,
//         quantity: 1,
//       },
//       {
//         orderId: orderBed.id,
//         productId: bed2.id,
//         price: 2500,
//         quantity: 2,
//       },
//       {
//         orderId: orderBed.id,
//         productId: bed3.id,
//         price: 1500,
//         quantity: 3,
//       },
//       {
//         orderId: orderChair.id,
//         productId: chair1.id,
//         price: 10,
//         quantity: 5,
//       },
//       {
//         orderId: orderChair.id,
//         productId: chair2.id,
//         price: 10,
//         quantity: 5,
//       },
//     ];
//     const orderProducts = await Promise.all(
//       orderProductsToCreate.map(addProductsToOrder)
//     );
//     console.log("order_products created: ", orderProducts);
//     console.log("Finished creating order_Products!");
//   } catch (error) {
//     throw error;
//   }
// }

async function createInitialCartProducts() {
  try {
    // console.log('starting to create cart product...');
    // console.log("getAllUsers",await getAllUsers());
    // console.log("getAllProducts", await getAllProducts());

    // const [user1, user2, user3, user4] = await getAllUsers();
    // const [sofa1, sofa2, dining1, dining2, bed1, bed2, bed3, chair1, chair2] =
    //   await getAllProducts();

    const cartProductsToCreate = [
      {
        userId: 12,
        productId: 2,
        price: 10,
        quantity: 5,
      },
      {
        userId: 12,
        productId: 6,
        price: 20,
        quantity: 50,
      },
      {
        userId: 2,
        productId: 6,
        price: 100,
        quantity: 2,
      },
      {
        userId: 2,
        productId: 5,
        price: 1200,
        quantity: 1,
      },
      {
        userId: 3,
        productId: 3,
        price: 2000,
        quantity: 1,
      }
      // {
      //   userId: 4,
      //   productId: 1,
      //   price: 2500,
      //   quantity: 2,
      // },
      // {
      //   userId: 5,
      //   productId: 1,
      //   price: 1500,
      //   quantity: 3,
      // },
      // {
      //   userId: 4,
      //   productId: 2,
      //   price: 10,
      //   quantity: 5,
      // },
      // {
      //   userId: 3,
			// 	productId: 2,
			// 	price: 10,
			// 	quantity: 5
			// }
		];
		const productsToCart = await Promise.all(cartProductsToCreate.map(createCartProduct));
		console.log('cart products created: ', productsToCart);
		console.log('Finished creating cart!');
	} catch (error) {
		throw error;
	}
}

async function createInitialCarts() {
  try {
    console.log('starting to create cart...');
    console.log("getAllUsers",await getAllUsers());
    console.log("getAllCartProducts", await getAllCartProducts());
		
		const [ user1, user2, user3, user4 ] = await getAllUsers();
    const [ cartProduct1, cartProduct2, cartProduct3, cartProduct4 ] = await getAllCartProducts();
    

		const cartToCreate = [
			{
				userId: 1,
				cartProductId: 1,
			},
      {
				userId: 1,
				cartProductId: 2,
			},
      {
				userId: 1,
				cartProductId: 3,
			},
      {
				userId: 2,
				cartProductId: 4,
			},
      // {
			// 	userId: user2.id,
			// 	cartProductId: cartProduct1.id,
			// },
      // {
			// 	userId: user3.id,
			// 	cartProductId: cartProduct1.id,
			// },
      // {
			// 	userId: user4.id,
			// 	cartProductId: cartProduct1.id,
			// },
      // {
			// 	userId: user4.id,
			// 	cartProductId: cartProduct4.id,
			// },
      // {
			// 	userId: user4.id,
			// 	cartProductId: cartProduct3.id,
			// },
      // {
			// 	userId: user2.id,
			// 	cartProductId: cartProduct3.id,
			// }
			
		];
		const productsToCart = await Promise.all(cartToCreate.map(addCartProductsToCart));
		console.log('cart products created: ', productsToCart);
		console.log('Finished creating cart!');
	} catch (error) {
		throw error;
	}
}

// async function createInitialCreditCard() {
//   console.log("Starting to create credit cards...");
//   try {
//     const creditCard = await Promise.all(creditCardToCreate.map(createCreditCard));

//     console.log("Credit card created:");
//     console.log(creditCard);
//     console.log("Finished creating orders!")
//   } catch (error) {
//     console.error("Error creating orders!");
//     throw error;
//   }
// }

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialCartProducts();
    // await createInitialOrders();
    // await createInitialOrderProducts();
    await createInitialCarts();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};

