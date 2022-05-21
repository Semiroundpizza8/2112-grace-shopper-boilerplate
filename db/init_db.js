const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');





async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order
  try {
    await client.query(`
    
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS product;
      DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}



async function createTables() {
  console.log("Starting to build tables...");
  // create all tables, in the correct order
  try {
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      firstname varchar(255) NOT NULL,
      lastname varchar(255) NOT NULL,
      address1 varchar(255) NOT NULL,
      email varchar(255) UNIQUE NOT NULL,
      city varchar(255) NOT NULL,
      state varchar(255) NOT NULL,
      zip INTEGER NOT NULL,
      password varchar(255) UNIQUE NOT NULL
    );  
    CREATE TABLE product (
      id SERIAL PRIMARY KEY,
      name varchar(255)  NOT NULL,
      description varchar(255) NOT NULL
      pictures varchar(255)  NOT NULL,
      price double  NOT NULL,
    ); 
    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "userId" varchar(255) REFERENCES users(id) ,
      price double REFERENCES product(price) NOT NULL,
      "isPayFor" BOOLEAN DEFAULT false,
    
    );
    CREATE TABLE cart_product (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES product(id),
      "cartId" INTEGER REFERENCES cart(id),
      quantity INTEGER,
      price double NOT NULL,
    ); 
    `);
  } catch (error) {
    //hash passwords on users^ ??
    //uniqueness on activities ^ ??
    //"publish routine" button on page to make routine public^
    console.error("Error creating tables.");
    throw error;
  }
}


async function populateInitialData() {
  try {
    const userData = [
      { firstname: "tony", 
      lastname: "Ayala",
       address1: "8525 PandaBear Lane", 
       email: "imacuddlePanada@gmail.com", 
       city: "Pandaville", 
       state: "california",
        zip: "75214",
         password: "blackandwhitealltheway"
    },

    { firstname: "Sandra", 
    lastname: "Quits",
     address1: "3311 Bamboo Street", 
     email: "IeatPanadasBamboo@gmail.com", 
     city: "bejing", 
     state: "china",
      zip: "84217",
       password: "bamboofarts"
},

{firstname: "Rihanna", 
lastname: "Marc",
 address1: "4444 Sunset Blvd", 
 email: "mylittepony@gmail.com", 
 city: "Sqwiggletown", 
 state: "Oregon",
  zip: "99998",
   password: "deepfriedpizzarolls"
}
 ]

//  const users = await Promise.all(userData.map(populateInitialData));
//     // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
  
  // const user1 = await User.createUser({ ...user info goes here... })
  console.log("populateInitalData");
    // console.log(users);
    console.log("Finished creating populateInitalData")
  } catch (error) {
    throw error;
  }
}


async function populateProductData() {
  try {
    const productData = [
      { name: "Rocket",
        description: "TrashPanda",
        picture: "png",
        price: "$55.00"
    },

    {name: "Gamora",
      description: "GreenbuttoxPanda",
      pictures: "png" ,
      price: "$150.00"
    },

{name: "Groot" ,
  description: "Cursed Wooden Pnada",
  pictures: "png" ,
  price: "place a bid" 
}
 ]

//  const products = await Promise.all(productData.map(populateProductData));
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
  
  // const user1 = await User.createUser({ ...user info goes here... })
  console.log("populateProductData");
    // console.log(products);
    console.log("Finished creating populateProductData")
  } catch (error) {
    throw error;
  }
}




async function buildTables() {
  try {
    client.connect();
    console.log("client has been contected")
    await dropTables();
    await createTables();
    // await populateInitialData();
    // await populateProductData();
   




    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}


buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

  module.exports = {
    buildTables,
    createTables,
    dropTables,


  }