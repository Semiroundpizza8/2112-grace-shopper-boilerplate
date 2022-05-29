//Cannot fix the cart until the order functions are ready


import React, { useEffect, useState } from 'react';
import { addNewCart, deleteCart, patchCart, getMyCart, createProductCart } from '../axios-services/cart';

const Cart = () => {

    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [myCart, setMyCart] = useState("");
    const [myCartList, setMyCartList] = useState("");
    const [editCount, setEditCount] = useState("");
    const [editPrice, setEditPrice] = useState("");


    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const userId = localStorage.getItem('userId');
    const cartProductArray = localStorage.getItem('cartProductArray')
    const cart = localStorage.getItem('cart')


useEffect(() => { (async () => {
  const getMyCartList = await getMyCart();
  setMyCart(getMyCartList)
})();
}, []);

const handleDeleteCart = async (cartId, event) => {
  event.preventDefault();
 const deletedCart =  await deleteCart(cartId);
 delete cartProductArray.cartId;
 localStorage.setItem('cartProductArray', JSON.stringify(cartProductArray));
 const myCartList = await getMyCart();
 setMyCart(myCartList)
}

const handleCreateCart = async (productId, event) => {
 event.preventDefault();
console.log("creating a new item in the cart");
      try{
          const addedCart = await addNewCart()
          const addProductsToCart = await createProductCart({productId, price, quantity})
       let newCart = addedCart.cartProductId.push(addProductsToCart);
      setMyCart(newCart);
    }
      catch(error){
        console.log(error)
      }
  }


    const handlePriceChange = (event) => {

      event.preventDefault();
      try{
        setPrice(event.target.value);
    }catch(error){
        throw error
    }
    }

    const handleQuantityChange = (event) => {
      event.preventDefault();
      try{
        setQuantity(event.target.value);
    }catch(error){
        throw error
    }
    }

    const handleEditCart = async (cartId, event) => {
        event.preventDefault();
       console.log("creating a new item in the cart");
             try{const editedCart = await patchCart(cartId, quantity, price)
                const myCartList = await getMyCart();
                setMyCart(myCartList)
            }
             catch(error){
               console.log(error)
             }
         }

  


    
        return (<div> 
        <div> <h2> Here all the items in your cart: </h2> 

         <div>{!myCart? <div> Nothing to show, yet! Add a products to your cart! </div> : <div> {myCart.map(cart =>
                <div key={cart.id}> 
                   
                      <p>product name:{cart.name}</p>
                    <p>product quantity:{cart.quantity}</p>
                    <p>product price:{cart.price}</p>
                    {<button key={cart.id} onClick={() => { setEditOpen({ open: !editOpen, id: cart.id }) }} editOpen={editOpen}>Edit Product</button>}
                                {editOpen.open && editOpen.id === cart.id ? <> New Product quantity:
                                <input value={editCount}
                                    onChange={handleQuantityChange} />
                                New total price :
                                <input value={editPrice}
                                    onChange={handlePriceChange} /><button onClick={(event) => { handleEditCart(cart.id, event) }}>Submit Edited cart</button> </> : null}
                    
                    
                   
                    {<button onClick={(id, event) => { handleDeleteCart(id, event) }}>Delete</button>}
                </div>
            ) }</div> }</div> 
        </div>
        </div>)
}


export default Cart;