const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS guestCart CASCADE;
    DROP TABLE IF EXISTS userCart CASCADE;
    DROP TABLE IF EXISTS checkout CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS customer CASCADE;
    DROP TABLE IF EXISTS paymentTable CASCADE; 
    `);
    // build tables in correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        role VARCHAR(255)
      );

      CREATE TABLE customer(
        id SERIAL PRIMARY KEY,
        "userId" INTERGER REFRENCES users(id),
        email VARCHAR(255) UNIQUE NOT NULL,
        "orderId" INTEGER REFRENCES orders(id)
      );

      CREATE TABLE paymentTable (
        id SERIAL PRIMARY KEY,
        "customerId" INTEGER REFRENCES customer(id) NOT NULL,
        "userId" INTEGER REFRENCES customer("userId"),
        "paymentType" VARCHAR(255) NOT NULL
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        "isAvailable" BOOLEAN DEFAULT false,
        stock INTEGER NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR(255),
        "reviewStar" INTEGER,
      );

      CREATE TABLE userCart (
        id SERIAL PRIMARY KEY,
        "customerId" INTEGER REFRENCES users(id),
        "productId" INTEGER REFRENCES products(id),
        total INTEGER,
      );

      CREATE TABLE guestCart (
        id SERIAL PRIMARY KEY,
        "productId" INTEFER REFRENCES products(id),
        total INTEGER,
      );

      CREATE TABLE checkout (
        id SERIAL PRIMARY KEY,
        "userCart" INTEGER REFRENCES userCart(id),
        "guestCart" INTEGER REFRENCES guestCart(id), 
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zipcode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone INTEGER NOT NULL
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zipcode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone INTEGER NOT NULL,
        "lineItems" VARCHAR(255),
        total INTEGER NOT NULL
      )

    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const usersToCreate = [
      {
        username: "Ramses",
        password: "ramses1!",
        email: "ramses@gmail.com",
        firstName: "Ramses",
        lastName: "Angles",
        role: "Admin",
      },
      {
        username: "albert",
        password: "bertie99",
        email: "bert@gmail.com",
        firstName: "Bert",
        lastName: "Nard",
        role: "customer",
      },
      {
        username: "sandra",
        password: "sandra123",
        email: "sandra@gmail.com",
        firstName: "Sandra",
        lastName: "Lemon",
        role: "user",
      },
      {
        username: "glamgal",
        password: "glamgal123",
        email: "glamgal@gmail.com",
        firstName: "Gloria",
        lastName: "Gal",
        role: "user",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
