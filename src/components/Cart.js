//Cannot fix the cart until the order functions are ready


// import React, { useEffect, useState } from 'react';
// import { addProductsToCart } from '../../db/models/cart_product';
// import { addToCart, deleteCart, patchCart, getMyCart } from '../axios-services/cart';

// const MyCart = (props) => {

//     const {login, products, user, orderList} = props;
//     const [quantity, setQuantity] = useState("");
//     const [price, setPrice] = useState("");
//     const [myCart, setMyCart] = useState("");

 
//     const [editOpen, setEditOpen] = useState(false);
//     const [addOpen, setAddOpen] = useState(false);



// useEffect(() => { (async () => {
//   const getMyCart = await getMyCart();
//   setMyCart(getMyCart)
// })();
// }, []);

// const handleDeleteCart = async (event) => {
//   event.preventDefault();
//  const deletedCart =  await deleteCart(cartId);
//   const userName = localStorage.getItem('username');
//   const myRoutines = await getMyRoutines(userName);
//   setMyRoutines(myRoutines);
// }



//     const handleCreateCart = async (event) => {
//       event.preventDefault();
//       console.log("creating a new item in the cart");
//       try{const addedCart = await addToCart(productId, quantity, price)
//       const newCartList = [
//           addedCart,
//           ...orderList
//       ]
//       setMyCart(newCartList);}
//       catch(error){
//         console.log(error)
//       }
//   }

//     const handlePriceChange = (event) => {
//       event.preventDefault();
//         setPrice(event.target.value);
//     }

//     const handleQuantityChange = (event) => {
//       event.preventDefault();
//         setQuantity(event.target.value);
//     }


//   const handleAddCartToOrder = async (orderId,event) => { 
//       event.preventDefault();
//   }

    
//         return (<div> 
//         <div> <h2> Here all the items in your cart: </h2> 

//         <div>{!orderList? <div> Nothing to show, yet! Add a products to your cart! </div> : <div> {orderList.map(order =>
//                 <div className="products" key={order.id}> 
//                     <div>{routine.carts.map(cart => <div key ={cart.id}>
//                       <p>product name:{cart.name}</p>
//                     <p>product quantity:{cart.quantity}</p>
//                     <p>product price:{cart.price}</p>
//                     {<button key={order.id} onClick={() => { setEditOpen({ open: !editOpen, id: cart.id }) }} editOpen={editOpen}>Edit Product</button>}
//                                 {editOpen.open && editOpen.id === cart.id ? <> New Product quantity:
//                                 <input value={editCount}
//                                     onChange={handleEditCount} />
//                                 New total price :
//                                 <input value={editPrice}
//                                     onChange={handleEditPrice} /><button onClick={(event) => { handleEditCart(cart.orderId, event) }}>Submit Edited cart</button> </> : null}
                            
//                             {<button onClick={(event) => { handleEditCart(cart.orderId, event) }}>Delete Item in Cart</button>}
//                     </div>)}</div>
                    
                   
//                     {<button onClick={(event) => { handleDelete(cart.id, event) }}>Delete</button>}
//                 </div>
//             ) }</div> }</div>
//         </div>
//         </div>)
// }


// export default MyCart;