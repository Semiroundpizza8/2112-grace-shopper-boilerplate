const express = require("express");
const cartRouter = express.Router();
const {getAllCartProducts, createCartProduct, updateCartProduct, deleteCartProduct, getCartProductById, getCartProductByUserId} = require('../db/models/cartProduct');
const {addCartProductsToCart, deleteCart, getCartById, getCartByUserId} = require('../db/models/cart');
const {createUser, getUser, getUserById, getUserByUsername, getAllUsers, getAdmin} = require('../db/models/user')
const jwt = require("jsonwebtoken");



cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart route")
    next();
});

//the below path was tested and returns the cart.

// cartRouter.post('/', async (req, res, next) => {
//   const {userId, cartProductId} = req.body;
//     try {
//       const newCart = await addCartProductsToCart(req.body);
//       console.log(req.body, newCart);
//       res.send(newCart);
//     } catch (error) {
//       next(error);
//     }
//   })



cartRouter.post('/', async (req, res, next) => {
  //const { userId, cartId } = req.params;
 // const user = await getuserById(userId);

    try {
      const newCart = await createCartProduct(req.body);
      console.log(req.body, newCart);
      res.send(newCart);
    } catch (error) {
      next(error);
    }
  })
  

  cartRouter.get('/:cartId', async (req,res,next) => {
    console.log("I'm inside the cartId route")
    const { cartId } = req.params;
    //const user = await getUserById(userId);


      try {
        
        const cart = await getCartProductById(cartId);
      //   if (cart.userId = userId ){
      //   res.send(cart);
      // } else {
      //   next({
      //     message: 'Not an authorized user to access cart'
      //   });
      res.send(cart);
      } catch (error) {
          next(error);
      }
  })


  cartRouter.get('/:userId', async (req,res,next) => {
    console.log("I'm inside the userId to get a cart route")
      try {
        const { userId } = req.params;

        const cart = await getCartProductByUserId(userId);
        console.log(cart);
        res.send(cart);
        
          
      } catch (error) {
          next(error);
      }
  })


  cartRouter.patch('/:cartProductId', async (req, res, next) => {
   
    const { cartProductId } = req.params;
	const { price, quantity } = req.body;

	const updateFields = {
		id: cartProductId
	};

	if (price) {
		updateFields.price = price;
	}
	if (quantity) {
		updateFields.quantity = quantity;
	}

	try {
		const originalCart = await getCartProductById(cartProductId);

		if (originalCart) {
			const updateCart = await updateProductInCartProduct(updateFields);

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

  cartRouter.delete('/:cartProductId', async (req, res, next) => {
    const { cartProductId } = req.params;
    try {
      const newCart = await deleteCartProduct(cartProductId);
      res.send(newCart);
    } catch (error) {
      next(error);
    }
  })




module.exports = cartRouter;