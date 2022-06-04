import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { addNewCart, deleteCart, patchCart, getMyCartProductbyUserId, createProductCart } from '../axios-services/cart';
import { getProductById } from '../axios-services/productScreen';
import "../style/Cart.css";
import { getAllOrders } from '../axios-services/orders';



const Cart = (props) => {
const {quantityInCart} = props;
    const [productsInCart, setProductsInCart] = useState([]);
    const [qty, setQty] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [editOpen, setEditOpen] = useState(false);
    const [singleProduct, setSingleProduct] = useState([]);

    const userId = localStorage.getItem('userId');
    const activeCart = JSON.parse(localStorage.getItem('ActiveCart'));

useEffect(() => { (async () => {
let myDBCartProducts;
let products=[];
if (userId){
    myDBCartProducts = await getMyCartProductbyUserId(userId);
    setProductsInCart(myDBCartProducts);
    } else {
    setProductsInCart(activeCart)
  }
   setSingleProduct(singleProduct);
})();
}, []);

  
const handleDeleteCart = async (cartId) => {
 const deletedCart =  await deleteCart(cartId);
 const myCartList = await getMyCartProductbyUserId(userId);
 setProductsInCart(myCartList)
}

const handleEditCart = async (productId, event) => {
  event.preventDefault();
             try{
                let myDBCartProducts = await getMyCartProductbyUserId(userId);
               let foundProduct = myDBCartProducts.find(({ productId }) => productId === productId)
                myDBCartProducts = await patchCart(foundProduct.id, foundProduct.price, qty )
                const myCartList = await getMyCartProductbyUserId(userId);
                setProductsInCart(myCartList)
            }
             catch(error){
               console.log(error)
             }
         }


 useEffect(() => { (async () => {
  let sumPrice=0;
            try{
              let myDBCartProducts = await getMyCartProductbyUserId(userId);
             myDBCartProducts.map(item => {
               sumPrice = Number(item.price) * Number(item.price) + Number(sumPrice);
             })
             setTotalPrice(sumPrice);
          }
           catch(error){
             console.log(error)
           }  
            })();
            }, []);
    
        return (
        <div> 
          <div>
            <h2> Here all the items in your cart: </h2> 

            <div class="cart">
              {!productsInCart ? 
              <div> Nothing to show, yet! Add a products to your cart! </div>  : 
              <div> 
                 <div>total products:{quantityInCart}</div>
                <div>total price:{totalPrice}</div>
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
                      {<button key={product.id} onClick={(event) => { setEditOpen({ open: !editOpen, id: product.id  }) }} editOpen={editOpen}> Edit Product</button>}
                        {editOpen.open && editOpen.id === product.id ? 
                        <> New Product quantity:
                                <input value={qty} onChange={(event) => setQty(event.target.value)} />
                                <button onClick={(event) => { handleEditCart(product.id, event) }}>Submit Edited cart</button>
                        </> : null}  
                      {<button onClick={(id, event) => { handleDeleteCart(product.id, event) }}>Delete</button>}</div>
                     
                    </div>
                   
                    </>
                    
                    )}
              </div>}
            </div>
        </div>
        <div> {<button onClick={(id, event) => { handleOrder(id, event) }}>Submit Order</button>} </div> 
        </div>)
}


export default Cart;
