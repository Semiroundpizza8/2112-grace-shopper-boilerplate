const express = require("express");
const cartRouter = express.Router();
const {addProductsToCart, updateProductInCart, deleteProductInCart, getCartById, getCartByUserId} = require('../db/models/cart_product');
const jwt = require("jsonwebtoken");



cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart route")
    next();
});

//the below path was tested and returns the cart.

cartRouter.post('/', async (req, res, next) => {
    
    try {
      const newCart = await addProductsToCart(req.body);
      console.log(req.body, newCart);
      res.send(newCart);
    } catch (error) {
      next(error);
    }
  })
  

  cartRouter.get('/:cartId', async (req,res,next) => {
    console.log("I'm inside the cartId route")
      try {
        const { cartId } = req.params;
        const cart = await getCartById(cartId);
        res.send(cart);
          
      } catch (error) {
          next(error);
      }
  })


  cartRouter.get('/user/:userId', async (req,res,next) => {
    console.log("I'm inside the userId to get a cart route")
      try {
        const { userId } = req.params;
        const cart = await getCartByUserId(userId);
        res.send(cart);
          
      } catch (error) {
          next(error);
      }
  })


  cartRouter.patch('/:cartId', async (req, res, next) => {
   
    const { cartId } = req.params;
	const { price, quantity } = req.body;

	const updateFields = {
		id: cartId
	};

	if (price) {
		updateFields.price = price;
	}
	if (quantity) {
		updateFields.quantity = quantity;
	}

	try {
		const originalCart = await getCartById(cartId);

		if (originalCart) {
			const updateCart = await updateProductInCart(updateFields);

			res.send(updateCart);
		} else {
			next({
				name: 'noCart',
				message: 'There is no cart to update!'
			});
		}
	} catch ({ name, message }) {
		next({
			name,
			message
		});
	}



  })

  cartRouter.delete('/:cartId', async (req, res, next) => {
    const { cartId } = req.params;
    try {
      const newCart = await deleteProductInCart(cartId);
      res.send(newCart);
    } catch (error) {
      next(error);
    }
  })




module.exports = cartRouter;