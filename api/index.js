const apiRouter = require('express').Router();
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db/models/user');
const jwt = require('jsonwebtoken');


apiRouter.use((req, res, next) => {
    console.log("A request is being made to "+req.originalUrl)
    next();
});


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

const userRouter = require('./user');
apiRouter.use('/user', userRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

const productRouter = require('./products');
apiRouter.use('/products',productRouter);

const orderRouter = require('./orders');
apiRouter.use('/order',orderRouter)




module.exports = apiRouter;