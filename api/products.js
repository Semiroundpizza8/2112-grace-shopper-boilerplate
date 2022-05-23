const express = require("express");
const productRouter = express.Router();
const { createProduct, getAllProducts, getProductById } = require('../db/models/products');
const jwt = require("jsonwebtoken");

productRouter.use((req, res, next) => {
    console.log("A request is being made to /products route")
    next();
});

productRouter.post('/', async (req, res, next) => {
    try {
      const newProduct = await createProduct(req.body);
      res.send(newProduct);
    } catch (error) {
      next(error);
    }
  })
  
  productRouter.get('/', async (req, res, next) => {
    try {
      const products = await getAllProducts();
      res.send({products});
    } catch (error){
      next(error);
    }
  })

  productRouter.get('/:productId', async (req,res,next) => {
      try {
        const { productId } = req.params;
        const product = await getProductById(productId);
        res.send(product);
          
      } catch (error) {
          next(error);
      }
  })


module.exports = productRouter;