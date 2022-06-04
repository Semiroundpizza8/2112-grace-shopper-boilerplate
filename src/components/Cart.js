//Cannot fix the cart until the order functions are ready


import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { addNewCart, deleteCart, patchCart, getMyCartProductbyUserId, createProductCart } from '../axios-services/cart';
import { getProductById } from '../axios-services/productScreen';
import "../style/Cart.css";



const Cart = () => {




    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [productsInCart, setProductsInCart] = useState([]);
    const [myCartList, setMyCartList] = useState("");
    const [editCount, setEditCount] = useState("");
    const [editPrice, setEditPrice] = useState("");
  //const [myDBCartProducts, setMyDBCartProducts] = useState();
    const [cartProduct, setCartProduct] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [singleProduct, setSingleProduct] = useState([]);

    const userId = localStorage.getItem('userId');
    //const myLocalCartProducts = JSON.parse(localStorage.getItem('cartProductArray'));
    const activeCart = JSON.parse(localStorage.getItem('ActiveCart'));
   console.log(activeCart);

useEffect(() => { (async () => {
let myDBCartProducts;
let products=[];
if (userId){
  myDBCartProducts = await getMyCartProductbyUserId(userId);
  setProductsInCart(myDBCartProducts);
}
  if (!userId) {
    setProductsInCart(activeCart)
  }
 

   setSingleProduct(singleProduct);

  console.log("myCart", productsInCart)

})();
}, []);


let allProducts = []

  
const handleDeleteCart = async (cartId) => {
  //event.preventDefault();
 const deletedCart =  await deleteCart(cartId);
 const myCartList = await getMyCartProductbyUserId(userId);
 setProductsInCart(myCartList)
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
               const editedCart = await patchCart(cartId, quantity)
                const myCartList = await getMyCartProductbyUserId(userId);
                setProductsInCart(myCartList)
            }
             catch(error){
               console.log(error)
             }
         }




    
        return (
        <div> 
          <div>
            <h2> Here all the items in your cart: </h2> 
            <div class="cart">
              {!productsInCart ? 
              <div> Nothing to show, yet! Add a products to your cart! </div>  : 
              <div> 
                 <div>total products:{}</div>
                <div>total price:{}</div>
                {productsInCart.map(product => 
                  <>
                    <div key={product.productId}> 
                    <div class="singleProductCart">
                      <img src={product.image} style={{"height": '100px'}}></img>
                      <p>product name:{product.name}</p>
                      <p>product description:{product.description}</p>
                      <p>product id:{product.productId}</p>
                      <p>product quantity:{product.quantity}</p>
                      <p>product price($):{product.price}</p>
                      <p>total($):{product.price*product.quantity}</p>
                      {<button 
                        key={product.id} 
                        onClick={() => { 
                          setEditOpen({ open: !editOpen, id: product.id  }) 
                        }}
                        editOpen={editOpen}>
                          Edit Product
                        </button>
                        }
                        {editOpen.open && editOpen.id === product.id ? 
                        <> New Product quantity:
                                <input value={editCount} onChange={handleQuantityChange} />
                                <button onClick={(event) => { handleEditCart(product.id, event) }}>Submit Edited cart</button>
                        </> : null}  
                      {<button onClick={(id, event) => { handleDeleteCart(product.id, event) }}>Delete</button>}</div>
                     
                    </div>
                    </>)}
              </div>}
            </div>
        </div>
        </div>)
}


export default Cart;