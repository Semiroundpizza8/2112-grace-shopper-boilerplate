//Cannot fix the cart until the order functions are ready


import React, { useEffect, useState } from 'react';
import {useHistory,Link} from 'react-router-dom'
import { addNewCart, deleteCart, patchCart, getMyCartProductbyUserId, createProductCart } from '../axios-services/cart';
import CheckoutPage from './CheckoutPage';

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
  console.log("userid",userId)
let myDBCartProducts;
let allProducts = [];
  if (activeCart){
  myDBCartProducts = await getMyCartProductbyUserId(userId);
  console.log("dbproducts",myDBCartProducts);
  }
  if (activeCart && myDBCartProducts){
  console.log("&&dbproducts",myDBCartProducts);
  allProducts.push(myDBCartProducts);
  console.log("active",activeCart)
} 
  if (activeCart){
    allProducts.push(activeCart);
  //console.log(activeCart)
}

// function sum(array){
//   for (let i=0; i<array.lenght; i++){
//   for (let j=0; j<array.length; j++){
//   if(array[i].productId = array[j].productId){
//     let newQuantity = array[i].quantity + array[j].quantity;
//     delete array[j];
//     array[i].quantity = newQuantity;
//   }
// }
// } return array;
// }

// products = sum(products);


  setMyCart(products);
  localStorage.setItem('ActiveCart', JSON.stringify(products));

  // const singProd = await getProductById(products.id);
  // setMySingleProduct(singProd);
  // console.log("singleProduct",singleProduct)
  

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
             try{
               const editedCart = await patchCart(cartId, quantity, price)
                const myCartList = await getMyCartProductbyUserId(userId);
                setMyCart(myCartList)
            }
             catch(error){
               console.log(error)
             }
         }

         let history = useHistory();

        const handleSubmitOrder = () =>{
          history.push('/checkout');
        }

        return (<div> 
        <div> <h2> Here all the items in your cart: </h2> 

         <div>{myCart ? <><div> 
           <div>{myCart.id}</div>

           {myCart.map(product =>
               <> <div key={product.id}> 
               
                {/* <> <div>{singleProduct.map(prod => <div key ={prod.id}>
                    <p>activity name:{prod.name}</p>
                    <p>activity description:{prod.description}</p> */}
                    <p>product id:{product.productId}</p>
                    <p>product quantity:{product.quantity}</p>
                    <p>product price:{product.price}</p>
                    {<button key={product.id} onClick={() => { setEditOpen({ open: !editOpen, id: product.id  }) }} editOpen={editOpen}>Edit Product</button>}
                                {editOpen.open && editOpen.id === product.id ? <> New Product quantity:
                                <input value={editCount}
                                    onChange={handleQuantityChange} />
                                New total price :
                                <button onClick={(event) => { handleEditCart(product.id, event) }}>Submit Edited cart</button> </> : null}
                     
                         
                    {<button onClick={(id, event) => { handleDeleteCart(id, event) }}>Delete Cart</button>}
                    {<button onClick={(id,event) => {handleSubmitOrder(id,event)}}>Submit Order</button>}
                </div>
            ) }
            

            <Link to = "/Shop"> Go Back to Product Page </Link>
            </div> </> : <div> Nothing to show, yet! Add a products to your cart! </div> }
            </div> 
        </div>
        </div>)
}


export default Cart;