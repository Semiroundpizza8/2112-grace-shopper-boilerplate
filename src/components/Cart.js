//Cannot fix the cart until the order functions are ready


import React, { useEffect, useState } from 'react';
import { addNewCart, deleteCart, patchCart, getMyCartProductbyUserId, createProductCart } from '../axios-services/cart';

const Cart = () => {

    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [myCart, setMyCart] = useState();
    const [myCartList, setMyCartList] = useState("");
    const [editCount, setEditCount] = useState("");
    const [editPrice, setEditPrice] = useState("");
  //const [myDBCartProducts, setMyDBCartProducts] = useState();
    const [cartProduct, setCartProduct] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const userId = localStorage.getItem('userId');
    //const myLocalCartProducts = JSON.parse(localStorage.getItem('cartProductArray'));
    const activeCart = JSON.parse(localStorage.getItem('ActiveCart'));
   

useEffect(() => { (async () => {
let myDBCartProducts;
let allProducts = [];
  if (activeCart){
  myDBCartProducts = await getMyCartProductbyUserId(userId);
  console.log(myDBCartProducts);
  }
  if (activeCart && myDBCartProducts){
  console.log(myDBCartProducts);
  allProducts.push(myDBCartProducts);
  console.log(activeCart)
} 
  if (activeCart){
    allProducts.push(activeCart);
  //console.log(activeCart)
}
  setMyCart(allProducts);
  localStorage.setItem('ActiveCart', JSON.stringify(allProducts));
})();
}, []);

const handleDeleteCart = async (cartId, event) => {
  event.preventDefault();
 const deletedCart =  await deleteCart(cartId);
 const myCartList = await getMyCartProductbyUserId(userId);
 setMyCart(myCartList)
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
                const myCartList = await getMyCartProductbyUserId(userId);
                setMyCart(myCartList)
            }
             catch(error){
               console.log(error)
             }
         }




    
        return (<div> 
        <div> <h2> Here all the items in your cart: </h2> 

         <div>{myCart ? <><div> 
           <div>{myCart.id}</div>

           {myCart.map(product =>
                <div key={product.id}> 
                      <p>product name:{myCart.id}</p>
                    <p>product quantity:{quantity}</p>
                    <p>product price:{price}</p>
                    {<button key={product.id} onClick={() => { setEditOpen({ open: !editOpen, id: product.id  }) }} editOpen={editOpen}>Edit Product</button>}
                                {editOpen.open && editOpen.id === product.id ? <> New Product quantity:
                                <input value={editCount}
                                    onChange={handleQuantityChange} />
                                New total price :
                                <button onClick={(event) => { handleEditCart(product.id, event) }}>Submit Edited cart</button> </> : null}
                     
                         
                    {<button onClick={(id, event) => { handleDeleteCart(id, event) }}>Delete</button>}
                </div>
            ) }
            

            
            </div> </> : <div> Nothing to show, yet! Add a products to your cart! </div> }
            </div> 
        </div>
        </div>)
}


export default Cart;