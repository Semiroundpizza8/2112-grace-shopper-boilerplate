const express = require("express");
const cartRouter = express.Router();
const {addProductsToCart, updateProductInCart, deleteProductInCart, getCartById} = require('../db/models/cart_product');
const jwt = require("jsonwebtoken");




cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart route")
    next();
});

cartRouter.post('/', async (req, res, next) => {
    try {
      const newCart = await addProductsToCart(req.body);
      res.send(newCart);
    } catch (error) {
      next(error);
    }
  })
  

  cartRouter.get('/:cartId', async (req,res,next) => {
      try {
        const { cartId } = req.params;
        const cart = await getCartById(cartId);
        res.send(cart);
          
      } catch (error) {
          next(error);
      }
  })

  cartRouter.patch('/:cartId/productId', async (req, res, next) => {
    try {
      const newCart = await updateProductInCart(productId);
      res.send(newCart);
    } catch (error) {
      next(error);
    }
  })

  cartRouter.delete('/:cartId', async (req, res, next) => {
    try {
      const newCart = await deleteProductInCart(productId);
      res.send(newCart);
    } catch (error) {
      next(error);
    }
  })




module.exports = cartRouter;