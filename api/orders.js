const express = require("express");
const orderRouter = express.Router();
const { createOrder, getAllOrders } = require('../db/models/orders');
const {addProductsToOrder} = require('../db/models/order_products');
const jwt = require("jsonwebtoken");

orderRouter.use((req, res, next) => {
    console.log("A request is being made to /orders route")
    next();
});

orderRouter.post('/', async (req, res, next) => {
    try {
      const newOrder = await createOrder(req.body);
      res.send(newOrder);
    } catch (error) {
      next(error);
    }
  })
  
  orderRouter.get('/', async (req, res, next) => {
    try {
      const orders = await getAllOrders();
      res.send(orders);
    } catch (error){
      next(error);
    }
  })

  orderRouter.post('/',async(req,res,next) => {
      try {
          const addProdsToOrder = await addProductsToOrder(req.body); 
          res.send(addProdsToOrder);
          
      } catch (error) {
          next(error);
      }
  })


module.exports = productRouter;