const express = require("express");
const cartRouter = express.Router();

cartRouter.use((req, res, next) =>{
    console.log("A request is being made to cart");
    next();
    
});


module.exports = cartRouter;