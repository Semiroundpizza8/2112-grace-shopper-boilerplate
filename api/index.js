const apiRouter = require('express').Router();
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db/models/user');
const jwt = require('jsonwebtoken');

const {
  createProduct,
  getAllProducts
} = require('../db/models/products')




apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});



apiRouter.use(async (req, res, next) => {
	const prefix = 'Bearer ';
	const auth = req.header('Authorization');

	if (!auth) {
		next();
	} else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length);

		try {
			const { id } = jwt.verify(token, JWT_SECRET);
			if (id) {
				req.user = await getUserById(id);
				next();
			}
		} catch ({ name, message }) {
			next({ name, message });
		}
	} else {
		next({
			name: 'AuthorizationHeaderError',
			message: `Authorization token must start with ${prefix}`
		});
	}
});



apiRouter.use((req, res, next) => {
	if (req.user) {
		console.log('User is set:', req.user);
	}
	next();
});



// place your routers here
apiRouter.post('/products', async (req, res, next) => {
  try {
    const newProduct = await createProduct(req.body);
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
})

apiRouter.get('/products', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send({products});
  } catch (error){
    next(error);
  }
})





const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);




module.exports = apiRouter;