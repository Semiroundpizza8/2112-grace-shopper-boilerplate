//Cannot fix the cart until the order functions are ready


import React, { useEffect, useState } from 'react';
import { addToCart, deleteCart, patchCart, getMyCart } from '../axios-services/cart';

const Cart = () => {

    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [myCart, setMyCart] = useState("");
    const [myCartList, setMyCartList] = useState("");
    const [cartIdArray, setCartIdArray] = useState([]);
    const [editCount, setEditCount] = useState("");
    const [editPrice, setEditPrice] = useState("");


    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const userId = localStorage.getItem('userId');
    // setCartIdArray(localStorage.getItem('cartArray'));


useEffect(() => { (async () => {
  const getMyCartList = await getMyCart();
  setMyCartList(getMyCartList)
})();
}, []);

const handleDeleteCart = async (cartId, event) => {
  event.preventDefault();
 const deletedCart =  await deleteCart(cartId);
 delete cartIdArray.cartId;
 localStorage.setItem('cartArray', JSON.stringify(cartIdArray));
 const myCartList = await getMyCart();
 setMyCartList(myCartList)
}

const handleCreateCart = async (productId, event) => {
 event.preventDefault();
console.log("creating a new item in the cart");
      try{const addedCart = await addToCart(userId, productId, quantity, price)
      const newCartList = [
          addedCart,
          ...myCartList
      ]
      setMyCartList(newCartList);}
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

    // const handleEditCart = (event) => {
    //     event.preventDefault();
    //       setQuantity(event.target.value);
    //   }

  


    
        return (<div> 
        <div> <h2> Here all the items in your cart: </h2> 

        {/* <div>{!myCartList? <div> Nothing to show, yet! Add a products to your cart! </div> : <div> {myCartList.map(cart =>
                <div className="products" key={cart.id}> 
                    <div>{myCartList.map(item => <div key ={item.id}>
                      <p>product name:{item.name}</p>
                    <p>product quantity:{item.quantity}</p>
                    <p>product price:{item.price}</p>
                    {<button key={cart.id} onClick={() => { setEditOpen({ open: !editOpen, id: item.id }) }} editOpen={editOpen}>Edit Product</button>}
                                {editOpen.open && editOpen.id === item.id ? <> New Product quantity:
                                <input value={editCount}
                                    onChange={handleQuantityChange} />
                                New total price :
                                <input value={editPrice}
                                    onChange={handlePriceChange} /><button onClick={(event) => { handleEditCart(item.id, event) }}>Submit Edited cart</button> </> : null}
                    </div>)}</div>
                    
                   
                    {<button onClick={(id, event) => { handleDeleteCart(id, event) }}>Delete</button>}
                </div>
            ) }</div> }</div> */}
        </div>
        </div>)
}


export default Cart;