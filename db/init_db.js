const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

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
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zipcode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        phone INTEGER NOT NULL
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
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
