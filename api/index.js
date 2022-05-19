const apiRouter = require('express').Router();
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

module.exports = apiRouter;
