const {
  client
  //add all other functions needed here.
} = require("./");

const {createUser, getUser, getUserById, getUserByUsername, getAllUsers} = require("./models")

async function buildTables() {
  try {

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS cart CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;

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

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        stock INTEGER NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR(255),
        "reviewStar" INTEGER,
      );


      CREATE TABLE orders (
        id SERIAL PRIMARY KEY, 
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        zipcode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        phone INTEGER NOT NULL
        total INTEGER NOT NULL
        status "PURCHASED" | "IN PROGRESS"
      );

      CREATE TABLE cart (
        id SERIAL PRIMARY KEY, 
        "userId" REFERENCES users(id),
        "productId" REFERENCES products(id),
        "ordersId" REFEREENCES orders(id),
        priceAtTimeOfPurchase INTEGER NOT NULL,
        quantity INTEGER NOT NULL
      );

    `);
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
	console.log('Starting to create users...');
	try {
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
        username: 'HPS76LC',
        email: 'morbi.tristique.senectus@google.couk',
        password: 'JIS22JDU0VX',
        firstName: 'Shea',
        lastName: 'Spears',
        role: 'user'
      },
      {
        username: 'IUB22IP',
        email: 'aliquam.vulputate@aol.edu',
        password: 'MEB53FOU6PR',
        firstName: 'Clio',
        lastName: 'Cox',
        role: 'user'
      },
      {
        username: 'TOF38MY',
        email: 'donec.tincidunt.donec@icloud.org',
        password: 'IFQ77QTI0BR',
        firstName: 'Conan',
        lastName: 'Burris',
        role: 'admin'
      },
      {
        username: 'EPJ35JN',
        email: 'fermentum.fermentum.arcu@yahoo.net',
        password: 'XYG71QYZ8IH',
        firstName: 'Vernon',
        lastName: 'Kidd',
        role: 'admin'
      },
      {
        username: 'KNL86FH',
        email: 'pellentesque@aol.org',
        password: 'CXS18BTJ8BF',
        firstName: 'Kato',
        lastName: 'Black',
        role: 'admin'
      },
      {
        username: 'XBY77WQ',
        email: 'enim.sit@icloud.com',
        password: 'JUG94FVJ9DV',
        firstName: 'Cassandra',
        lastName: 'Keith',
        role: 'user'
      },
      {
        username: 'EXU91HW',
        email: 'at.fringilla.purus@outlook.net',
        password: 'DOX63WRV4OY',
        firstName: 'Nero',
        lastName: 'Morales',
        role: 'admin'
      },
      {
        username: 'XEZ38EF',
        email: 'luctus.et@hotmail.ca',
        password: 'SKB63JZI5BH',
        firstName: 'Maryam',
        lastName: 'Jimenez',
        role: 'admin'
      },
      {
        username: 'TBC84DN',
        email: 'gravida.mauris@hotmail.net',
        password: 'HOR46LHW2PO',
        firstName: 'Leigh',
        lastName: 'Miranda',
        role: 'user'
      },
      {
        username: 'ULI30WX',
        email: 'elit.nulla@aol.couk',
        password: 'VOT64GES0DU',
        firstName: 'Amal',
        lastName: 'Patrick',
        role: 'user'
      },
      {
        username: 'HVQ84QT',
        email: 'et@aol.com',
        password: 'GBL81OWZ1FT',
        firstName: 'Cyrus',
        lastName: 'Whitehead',
        role: 'admin'
      },
      {
        username: 'NUF77QX',
        email: 'convallis@google.couk',
        password: 'BQK38YYH0BB',
        firstName: 'Bethany',
        lastName: 'Solomon',
        role: 'admin'
      },
      {
        username: 'JVY17GM',
        email: 'mus.donec.dignissim@yahoo.org',
        password: 'FSK16GUY8XX',
        firstName: 'Rhona',
        lastName: 'Estrada',
        role: 'admin'
      },
      {
        username: 'FQB86XC',
        email: 'ultrices.mauris.ipsum@protonmail.couk',
        password: 'LGN55OGN9NN',
        firstName: 'Erin',
        lastName: 'Duffy',
        role: 'admin'
      },
      {
        username: 'QTX82PK',
        email: 'sed.neque@yahoo.edu',
        password: 'KDG63BEB6ZB',
        firstName: 'Clinton',
        lastName: 'Dillard',
        role: 'user'
      },
      {
        username: 'SJO44OE',
        email: 'diam@aol.edu',
        password: 'LLP38NCH6BL',
        firstName: 'Judah',
        lastName: 'Schroeder',
        role: 'admin'
      },
      {
        username: 'QKP02TJ',
        email: 'ornare.fusce@protonmail.ca',
        password: 'FHG03IBK3BK',
        firstName: 'Solomon',
        lastName: 'Bradley',
        role: 'user'
      },
      {
        username: 'CEG78DE',
        email: 'sit.amet@protonmail.couk',
        password: 'PJC66OIH8FI',
        firstName: 'Justin',
        lastName: 'Daniel',
        role: 'user'
      },
      {
        username: 'QQS69SY',
        email: 'non@google.org',
        password: 'IWF41GQX7BC',
        firstName: 'Chanda',
        lastName: 'Oneil',
        role: 'admin'
      }
		];
		const users = await Promise.all(usersToCreate.map(createUser));

		console.log('Users created:');
		console.log(users);
		console.log('Finished creating users!');
	} catch (error) {
		console.error('Error creating users!');
		throw error;
	}
}

async function createInitialProducts() {
	try {
		console.log('Starting to create products...');

		const productsToAdd = [
      {
        name: 'interdum.',
        description: 'amet nulla. Donec non justo. Proin non massa non ante',
        stock: 11,
        price: '$78.77',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'mi.',
        description: 'sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo.',
        stock: 5,
        price: '$26.31',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'tempor',
        description: 'amet nulla. Donec non justo. Proin non massa non ante',
        stock: 23,
        price: '$27.38',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'eget',
        description: 'urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim.',
        stock: 5,
        price: '$4.03',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'in',
        description: 'quam. Pellentesque habitant morbi tristique senectus et netus et malesuada',
        stock: 6,
        price: '$41.86',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'scelerisque',
        description: 'quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus',
        stock: 0,
        price: '$19.60',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'ac',
        description: 'ante dictum mi, ac mattis velit justo nec ante. Maecenas',
        stock: 11,
        price: '$6.96',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'sed',
        description: 'libero. Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet',
        stock: 20,
        price: '$14.57',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'gravida',
        description: 'sit amet, risus. Donec nibh enim, gravida sit amet, dapibus',
        stock: 10,
        price: '$4.22',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'metus',
        description: 'metus. In nec orci. Donec nibh. Quisque nonummy ipsum non',
        stock: 28,
        price: '$28.02',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'scelerisque',
        description: 'ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et,',
        stock: 12,
        price: '$14.48',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'ad',
        description: 'malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit.',
        stock: 18,
        price: '$88.10',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'convallis,',
        description: 'amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis',
        stock: 25,
        price: '$76.94',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'ultrices,',
        description: 'blandit at, nisi. Cum sociis natoque penatibus et magnis dis',
        stock: 28,
        price: '$91.94',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'sed',
        description: 'a, auctor non, feugiat nec, diam. Duis mi enim, condimentum',
        stock: 30,
        price: '$11.99',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'diam.',
        description: 'penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean',
        stock: 9,
        price: '$90.20',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'at',
        description: 'Aenean gravida nunc sed pede. Cum sociis natoque penatibus et',
        stock: 25,
        price: '$99.58',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'ligula.',
        description: 'magnis dis parturient montes, nascetur ridiculus mus. Proin vel arcu',
        stock: 26,
        price: '$44.54',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'tincidunt',
        description: 'ornare tortor at risus. Nunc ac sem ut dolor dapibus',
        stock: 27,
        price: '$60.33',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'dui.',
        description: 'pede et risus. Quisque libero lacus, varius et, euismod et,',
        stock: 14,
        price: '$46.45',
        reviewStars: 0,
        category: 'beds'
      },
      {
        name: 'turpis.',
        description: 'nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod',
        stock: 15,
        price: '$83.22',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'rutrum',
        description: 'massa non ante bibendum ullamcorper. Duis cursus, diam at pretium',
        stock: 24,
        price: '$12.49',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'nec',
        description: 'dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc',
        stock: 14,
        price: '$69.55',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'convallis,',
        description: 'sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut',
        stock: 4,
        price: '$1.52',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'vel,',
        description: 'eget varius ultrices, mauris ipsum porta elit, a feugiat tellus',
        stock: 15,
        price: '$47.00',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'varius',
        description: 'dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl.',
        stock: 1,
        price: '$19.65',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'erat.',
        description: 'luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget,',
        stock: 22,
        price: '$87.86',
        reviewStars: 0,
        category: 'beds'
      },
      {
        name: 'sodales',
        description: 'Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris,',
        stock: 11,
        price: '$6.96',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'interdum',
        description: 'lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam',
        stock: 29,
        price: '$2.97',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'Integer',
        description: 'egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie',
        stock: 6,
        price: '$48.14',
        reviewStars: 0,
        category: 'beds'
      },
      {
        name: 'Fusce',
        description: 'adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc',
        stock: 28,
        price: '$36.01',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'metus',
        description: 'ac libero nec ligula consectetuer rhoncus. Nullam velit dui, semper',
        stock: 24,
        price: '$96.17',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'Mauris',
        description: 'dui, in sodales elit erat vitae risus. Duis a mi',
        stock: 23,
        price: '$60.36',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'at',
        description: 'placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante,',
        stock: 11,
        price: '$23.05',
        reviewStars: 0,
        category: 'beds'
      },
      {
        name: 'convallis,',
        description: 'cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis',
        stock: 20,
        price: '$40.01',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'massa.',
        description: 'purus, in molestie tortor nibh sit amet orci. Ut sagittis',
        stock: 25,
        price: '$19.78',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'tempor',
        description: 'consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus',
        stock: 6,
        price: '$49.53',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'Aliquam',
        description: 'a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed',
        stock: 4,
        price: '$74.35',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'mauris',
        description: 'scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia.',
        stock: 9,
        price: '$29.36',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'egestas',
        description: 'montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc',
        stock: 10,
        price: '$53.09',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'sodales',
        description: 'id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend',
        stock: 14,
        price: '$38.08',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'placerat',
        description: 'elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec',
        stock: 12,
        price: '$4.83',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'luctus',
        description: 'fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor,',
        stock: 6,
        price: '$31.96',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'tincidunt',
        description: 'Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra.',
        stock: 14,
        price: '$58.86',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'Phasellus',
        description: 'sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor',
        stock: 5,
        price: '$52.29',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'tincidunt.',
        description: 'Nulla facilisi. Sed neque. Sed eget lacus. Mauris non dui',
        stock: 1,
        price: '$9.51',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'pharetra.',
        description: 'eu, odio. Phasellus at augue id ante dictum cursus. Nunc',
        stock: 15,
        price: '$22.94',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'Nullam',
        description: 'nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam',
        stock: 25,
        price: '$66.99',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'mauris',
        description: 'sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis',
        stock: 26,
        price: '$45.90',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'erat.',
        description: 'vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor',
        stock: 3,
        price: '$43.06',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'in,',
        description: 'lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi.',
        stock: 14,
        price: '$59.96',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'eu',
        description: 'cursus purus. Nullam scelerisque neque sed sem egestas blandit. Nam',
        stock: 1,
        price: '$65.79',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'libero',
        description: 'enim non nisi. Aenean eget metus. In nec orci. Donec',
        stock: 25,
        price: '$1.15',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'ac',
        description: 'sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus',
        stock: 0,
        price: '$73.68',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'hendrerit',
        description: 'aptent taciti sociosqu ad litora torquent per conubia nostra, per',
        stock: 15,
        price: '$71.31',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'Vivamus',
        description: 'purus, in molestie tortor nibh sit amet orci. Ut sagittis',
        stock: 7,
        price: '$98.17',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'sagittis',
        description: 'Nam interdum enim non nisi. Aenean eget metus. In nec',
        stock: 1,
        price: '$33.11',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'in,',
        description: 'a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris',
        stock: 18,
        price: '$43.90',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'nulla',
        description: 'sit amet, consectetuer adipiscing elit. Aliquam auctor, velit eget laoreet',
        stock: 26,
        price: '$68.36',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'scelerisque',
        description: 'at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada',
        stock: 27,
        price: '$13.68',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'amet',
        description: 'ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate,',
        stock: 21,
        price: '$63.09',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'quam',
        description: 'nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae',
        stock: 2,
        price: '$4.32',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'ornare,',
        description: 'Fusce fermentum fermentum arcu. Vestibulum ante ipsum primis in faucibus',
        stock: 15,
        price: '$63.05',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'eu,',
        description: 'justo eu arcu. Morbi sit amet massa. Quisque porttitor eros',
        stock: 10,
        price: '$84.01',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'amet',
        description: 'ultrices sit amet, risus. Donec nibh enim, gravida sit amet,',
        stock: 20,
        price: '$40.36',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'dictum',
        description: 'dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate',
        stock: 29,
        price: '$57.44',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'eros',
        description: 'Donec est mauris, rhoncus id, mollis nec, cursus a, enim.',
        stock: 1,
        price: '$40.46',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'nonummy',
        description: 'dui. Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel,',
        stock: 20,
        price: '$23.98',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'Donec',
        description: 'lorem vitae odio sagittis semper. Nam tempor diam dictum sapien.',
        stock: 14,
        price: '$13.99',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'cursus,',
        description: 'nunc ac mattis ornare, lectus ante dictum mi, ac mattis',
        stock: 22,
        price: '$47.55',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'ornare.',
        description: 'Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie',
        stock: 21,
        price: '$15.53',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'Donec',
        description: 'malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris',
        stock: 25,
        price: '$97.01',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'elementum',
        description: 'pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu',
        stock: 15,
        price: '$34.23',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'nunc',
        description: 'et, commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur consequat,',
        stock: 8,
        price: '$32.01',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'lobortis',
        description: 'Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus',
        stock: 18,
        price: '$28.32',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'Quisque',
        description: 'arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing.',
        stock: 18,
        price: '$47.38',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'vitae',
        description: 'adipiscing, enim mi tempor lorem, eget mollis lectus pede et',
        stock: 14,
        price: '$45.73',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'nec',
        description: 'velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus.',
        stock: 4,
        price: '$28.39',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'felis.',
        description: 'eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum',
        stock: 6,
        price: '$15.32',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'magnis',
        description: 'Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate,',
        stock: 10,
        price: '$42.97',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'mauris',
        description: 'quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar',
        stock: 12,
        price: '$66.98',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'mollis',
        description: 'orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras',
        stock: 27,
        price: '$87.77',
        reviewStars: 0,
        category: 'beds'
      },
      {
        name: 'Sed',
        description: 'enim. Nunc ut erat. Sed nunc est, mollis non, cursus',
        stock: 14,
        price: '$24.01',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'odio',
        description: 'non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh.',
        stock: 29,
        price: '$50.94',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'metus',
        description: 'Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id,',
        stock: 4,
        price: '$11.26',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'nibh.',
        description: 'non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh.',
        stock: 3,
        price: '$37.65',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'dictum',
        description: 'nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor',
        stock: 5,
        price: '$77.52',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'amet,',
        description: 'sodales. Mauris blandit enim consequat purus. Maecenas libero est, congue',
        stock: 13,
        price: '$78.24',
        reviewStars: 0,
        category: 'beds'
      },
      {
        name: 'Donec',
        description: 'ac turpis egestas. Fusce aliquet magna a neque. Nullam ut',
        stock: 27,
        price: '$27.11',
        reviewStars: 4,
        category: 'beds'
      },
      {
        name: 'Integer',
        description: 'Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo',
        stock: 23,
        price: '$74.83',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'ligula.',
        description: 'ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero',
        stock: 5,
        price: '$75.04',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'interdum',
        description: 'felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem,',
        stock: 21,
        price: '$17.92',
        reviewStars: 5,
        category: 'beds'
      },
      {
        name: 'hendrerit',
        description: 'torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam',
        stock: 20,
        price: '$51.27',
        reviewStars: 3,
        category: 'beds'
      },
      {
        name: 'sem',
        description: 'placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna',
        stock: 30,
        price: '$88.76',
        reviewStars: 0,
        category: 'beds'
      },
      {
        name: 'a,',
        description: 'neque non quam. Pellentesque habitant morbi tristique senectus et netus',
        stock: 23,
        price: '$94.46',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'sollicitudin',
        description: 'Donec nibh enim, gravida sit amet, dapibus id, blandit at,',
        stock: 9,
        price: '$47.74',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'aliquet.',
        description: 'ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et,',
        stock: 2,
        price: '$27.80',
        reviewStars: 0,
        category: 'beds'
      },
      {
        name: 'eget',
        description: 'dui, in sodales elit erat vitae risus. Duis a mi',
        stock: 12,
        price: '$30.25',
        reviewStars: 2,
        category: 'beds'
      },
      {
        name: 'libero',
        description: 'sit amet, faucibus ut, nulla. Cras eu tellus eu augue',
        stock: 19,
        price: '$80.45',
        reviewStars: 1,
        category: 'beds'
      },
      {
        name: 'dictum',
        description: 'Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc',
        stock: 23,
        price: '$23.23',
        reviewStars: 5,
        category: 'beds'
      }
		];
		const products = await Promise.all(productsToAdd.map(productAdded));

		console.log('products created:');
		console.log(products);

		console.log('Finished creating products!');
	} catch (error) {
		console.error('Error creating products!');
		throw error;
	}
}


async function createInitialOrders() {
	console.log('Starting to create orders...');
	try {
		const ordersToCreate = [

      {
        firstName: 'Lee',
        lastName: 'Shannon',
        email: 'ipsum.porta.elit@protonmail.ca',
        street: 'Ap #677-2045 Dictum. Ave',
        city: 'Murcia',
        zipcode: '542538',
        country: 'Vietnam',
        phone: '(378) 713-2327',
        total: '$82.76'
      },
      {
        firstName: 'Kelsey',
        lastName: 'Willis',
        email: 'mauris.vel.turpis@protonmail.org',
        street: 'P.O. Box 869, 5322 Duis Avenue',
        city: 'Sungei Kadut',
        zipcode: '81175',
        country: 'South Korea',
        phone: '1-886-415-3523',
        total: '$29.28'
      },
      {
        firstName: 'Julian',
        lastName: 'James',
        email: 'vel.arcu.eu@hotmail.edu',
        street: '548 Iaculis Rd.',
        city: 'Kapolei',
        zipcode: '967988',
        country: 'Sweden',
        phone: '(259) 814-1832',
        total: '$85.05'
      },
      {
        firstName: 'Vielka',
        lastName: 'Mitchell',
        email: 'eleifend.non.dapibus@aol.com',
        street: '8505 Enim Rd.',
        city: 'Nizip',
        zipcode: '8572',
        country: 'China',
        phone: '1-343-573-5247',
        total: '$44.21'
      },
      {
        firstName: 'Galvin',
        lastName: 'Walter',
        email: 'sed@protonmail.couk',
        street: '6871 Pede. Rd.',
        city: 'Haren',
        zipcode: '920136',
        country: 'Peru',
        phone: '(844) 855-3575',
        total: '$85.32'
      },
      {
        firstName: 'Thomas',
        lastName: 'Gutierrez',
        email: 'malesuada@yahoo.couk',
        street: '9700 Nunc St.',
        city: 'Los Vilos',
        zipcode: '292744',
        country: 'Austria',
        phone: '(330) 461-6184',
        total: '$38.43'
      },
      {
        firstName: 'Cadman',
        lastName: 'Morrison',
        email: 'dolor.donec.fringilla@yahoo.org',
        street: '284 Vel, Street',
        city: 'Aparecida de Goiânia',
        zipcode: '24017',
        country: 'Spain',
        phone: '(945) 751-2560',
        total: '$24.52'
      },
      {
        firstName: 'Chastity',
        lastName: 'Howe',
        email: 'eget.ipsum@aol.com',
        street: '582 Lacus Rd.',
        city: 'Chancay',
        zipcode: '31862',
        country: 'Belgium',
        phone: '(977) 545-5035',
        total: '$13.14'
      },
      {
        firstName: 'Thane',
        lastName: 'Mays',
        email: 'ornare.placerat@yahoo.couk',
        street: 'P.O. Box 766, 8262 Eu Av.',
        city: 'Port Nolloth',
        zipcode: '12266',
        country: 'Vietnam',
        phone: '(864) 486-1513',
        total: '$91.86'
      },
      {
        firstName: 'Paula',
        lastName: 'Ross',
        email: 'lorem.ipsum@google.com',
        street: '6351 Luctus St.',
        city: 'Guizhou',
        zipcode: '88262',
        country: 'Spain',
        phone: '(368) 112-2658',
        total: '$29.37'
      },
      {
        firstName: 'Jackson',
        lastName: 'Hudson',
        email: 'pede.malesuada.vel@outlook.edu',
        street: '551-2290 Varius. Avenue',
        city: 'Seloignes',
        zipcode: '225398',
        country: 'United States',
        phone: '(355) 719-7074',
        total: '$75.54'
      },
      {
        firstName: 'Halla',
        lastName: 'Joyce',
        email: 'at.pede@hotmail.org',
        street: '611-9564 Vestibulum Avenue',
        city: 'Sokoto',
        zipcode: '549374',
        country: 'Sweden',
        phone: '1-678-478-2363',
        total: '$11.04'
      },
      {
        firstName: 'Quail',
        lastName: 'May',
        email: 'nam@yahoo.couk',
        street: '336-5191 Ante St.',
        city: 'General Santos',
        zipcode: '887264',
        country: 'Belgium',
        phone: '(746) 365-6148',
        total: '$39.55'
      },
      {
        firstName: 'Cheryl',
        lastName: 'Gordon',
        email: 'lobortis.mauris.suspendisse@aol.net',
        street: 'P.O. Box 881, 7575 Diam St.',
        city: 'Dubno',
        zipcode: '15521',
        country: 'Canada',
        phone: '(777) 423-1597',
        total: '$79.33'
      },
      {
        firstName: 'Ulla',
        lastName: 'Colon',
        email: 'rhoncus.id.mollis@outlook.edu',
        street: '825-5678 Volutpat. Street',
        city: 'Emalahleni',
        zipcode: '45135',
        country: 'Nigeria',
        phone: '1-280-992-5537',
        total: '$60.70'
      },
      {
        firstName: 'Selma',
        lastName: 'Barron',
        email: 'consectetuer.adipiscing.elit@aol.edu',
        street: '950-9572 Sit Street',
        city: 'Kirkintilloch',
        zipcode: '02541',
        country: 'Brazil',
        phone: '1-964-345-1420',
        total: '$45.75'
      },
      {
        firstName: 'Camilla',
        lastName: 'Cantu',
        email: 'vulputate@protonmail.edu',
        street: 'Ap #701-679 Eget, Rd.',
        city: 'Recife',
        zipcode: '22618',
        country: 'Canada',
        phone: '(861) 484-3844',
        total: '$35.00'
      },
      {
        firstName: 'Nash',
        lastName: 'Torres',
        email: 'egestas.hendrerit@yahoo.couk',
        street: '233-9628 Ipsum. Street',
        city: 'Monfumo',
        zipcode: '31183',
        country: 'China',
        phone: '1-442-311-6831',
        total: '$18.42'
      },
      {
        firstName: 'Merritt',
        lastName: 'Acevedo',
        email: 'tincidunt@icloud.ca',
        street: '681-3680 Mauris Av.',
        city: 'Liaoning',
        zipcode: '6155-9518',
        country: 'Russian Federation',
        phone: '1-354-477-4566',
        total: '$99.67'
      },
      {
        firstName: 'Aristotle',
        lastName: 'Hickman',
        email: 'non.egestas@hotmail.edu',
        street: '835-8352 Odio. Av.',
        city: 'Newton',
        zipcode: '5424 YG',
        country: 'Vietnam',
        phone: '1-889-569-3426',
        total: '$65.69'
      },
      {
        firstName: 'Clark',
        lastName: 'Fernandez',
        email: 'magna.nam@yahoo.couk',
        street: 'Ap #136-206 Donec Road',
        city: 'Iloilo City',
        zipcode: '5347',
        country: 'Peru',
        phone: '(775) 308-2306',
        total: '$79.18'
      },
      {
        firstName: 'Walter',
        lastName: 'Gould',
        email: 'diam.luctus@yahoo.com',
        street: '163-8937 Lacus. Av.',
        city: 'Belfast',
        zipcode: '447595',
        country: 'Canada',
        phone: '1-408-781-1284',
        total: '$31.18'
      },
      {
        firstName: 'Susan',
        lastName: 'Dale',
        email: 'sed.pede@icloud.org',
        street: 'Ap #393-2879 Non, Street',
        city: 'Ipiales',
        zipcode: '36302',
        country: 'Netherlands',
        phone: '1-790-617-3665',
        total: '$55.32'
      },
      {
        firstName: 'Flynn',
        lastName: 'Randall',
        email: 'a.scelerisque@outlook.couk',
        street: 'P.O. Box 742, 3180 Diam St.',
        city: 'Calapan',
        zipcode: '7764',
        country: 'Germany',
        phone: '(223) 242-2793',
        total: '$30.42'
      },
      {
        firstName: 'Finn',
        lastName: 'Donovan',
        email: 'metus@google.ca',
        street: '752-1109 Lacus. Road',
        city: 'Lleida',
        zipcode: '735650',
        country: 'Belgium',
        phone: '(782) 303-3521',
        total: '$83.38'
      },
      {
        firstName: 'Harriet',
        lastName: 'Combs',
        email: 'luctus@hotmail.edu',
        street: '557-9080 Morbi Av.',
        city: 'Tarnów',
        zipcode: '024293',
        country: 'Vietnam',
        phone: '1-425-705-4448',
        total: '$81.68'
      },
      {
        firstName: 'Jerome',
        lastName: 'Harris',
        email: 'interdum.ligula@hotmail.ca',
        street: '977-6275 Lacus Rd.',
        city: 'Bo‘lhe',
        zipcode: '4557 XL',
        country: 'Sweden',
        phone: '(589) 481-7642',
        total: '$22.32'
      },
      {
        firstName: 'Melyssa',
        lastName: 'Ferrell',
        email: 'suspendisse.dui.fusce@outlook.net',
        street: 'Ap #820-6049 Semper Road',
        city: 'Jhang',
        zipcode: '82803',
        country: 'Netherlands',
        phone: '(552) 631-1771',
        total: '$95.16'
      },
      {
        firstName: 'Conan',
        lastName: 'Burris',
        email: 'donec.tincidunt.donec@icloud.org',
        street: 'Ap #226-9492 Nunc Rd.',
        city: 'Skövde',
        zipcode: '97431',
        country: 'Italy',
        phone: '1-876-692-3470',
        total: '$39.85'
      },
      {
        firstName: 'Clio',
        lastName: 'Cox',
        email: 'aliquam.vulputate@aol.edu',
        street: '356-6178 Ac Rd.',
        city: 'Darbhanga',
        zipcode: '157210',
        country: 'Costa Rica',
        phone: '1-576-774-5204',
        total: '$82.17'
      },
      {
        firstName: 'Shea',
        lastName: 'Spears',
        email: 'morbi.tristique.senectus@google.couk',
        street: '467-6965 Interdum Avenue',
        city: 'Rodgau',
        zipcode: '78804-67150',
        country: 'Australia',
        phone: '(693) 481-8573',
        total: '$20.76'
      }
		];
		const users = await Promise.all(odersToCreate.map(createOrders));

		console.log('Users created:');
		console.log(users);
		console.log('Finished creating users!');
	} catch (error) {
		console.error('Error creating users!');
		throw error;
	}
}



async function createInitialCarts() {

			try {
        console.log('starting to create the cart...');
        // const [ user1, user2, user3 ] = await  AddFunctionThatRetrievesUserInfo
        // const [ product1, product2, product3  ] = await AddFunctionThatRetrievesProductInfo
        // const [ order1, order2, order3  ] = await AddFunctionThatRetrievesOrderInfo -orderId needs to match userinfo.
        
    
        const cartToCreate = [
          {
            userId: user1.id,
            productId: product3.id,
            ordersId: order2.id,
            priceAtTimeOfPurchase: 30,
            quantity: 5
          },
          {
            userId: user2.id,
            productId: product3.id,
            ordersId: order2.id,
            priceAtTimeOfPurchase: 20,
            quantity: 1
          },
          {
            userId: user3.id,
            productId: product3.id,
            ordersId: order2.id,
            priceAtTimeOfPurchase: 17,
            quantity: 3
          },
          {
            userId: user1.id,
            productId: product2.id,
            ordersId: order1.id,
            priceAtTimeOfPurchase: 30,
            quantity: 5
          },
          {
            userId: user1.id,
            productId: product1.id,
            ordersId: order2.id,
            priceAtTimeOfPurchase: 10,
            quantity: 5
          },
          {
            userId: user1.id,
            productId: product3.id,
            ordersId: order2.id,
            priceAtTimeOfPurchase: 10,
            quantity: 5
          },
          {
            userId: user1.id,
            productId: product3.id,
            ordersId: order2.id,
            priceAtTimeOfPurchase: 10,
            quantity: 5
          },
		];
		const carts = await Promise.all(cartsToCreate.map(createCarts));

		console.log('Carts created:');
		console.log('Finished creating carts!');
	} catch (error) {
		console.error('Error creating carts!');
		throw error;
	}
}

async function rebuildDB() {
	try {
		client.connect();
		await buildTables();
		await createInitialUsers();
		await createInitialProducts();
		await createInitialOrders();
		await createInitialCarts();
	} catch (error) {
		console.log('Error during rebuildDB');
		throw error;
	}
}



module.exports = {
	rebuildDB
};
