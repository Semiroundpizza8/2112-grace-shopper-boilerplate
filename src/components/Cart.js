import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { addNewCart, deleteCart, patchCart, getMyCartProductbyUserId, createProductCart } from '../axios-services/cart';
import { getProductById } from '../axios-services/productScreen';
import "../style/Cart.css";
import { getAllOrders } from '../axios-services/orders';



const Cart = (props) => {
  let history = useHistory();
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
      if(activeCart){
      activeCart.map(async item => {
       let product = await getProductById(item.productId);
       console.log(product);
        item.name = product.name;
        item.description = product.description;
        item.image = product.image;
      })
      console.log(activeCart);
      localStorage.setItem("ActiveCartWProducts", JSON.stringify(activeCart));
      setProductsInCart(activeCart)
      }
    
  }
})();
}, []);

const activeCartWProducts = JSON.parse(localStorage.getItem('ActiveCart'));

const handleDeleteCart = async (cartId) => {
  if(userId){
 const deletedCart =  await deleteCart(cartId);
 const myCartList = await getMyCartProductbyUserId(userId);
 setProductsInCart(myCartList)
} else {
  if (activeCartWProducts){
    let foundProduct = activeCartWProducts.find(({ productId }) => productId === productId);
    console.log(activeCartWProducts);
    console.log(foundProduct);
    let foundProductIndex = activeCartWProducts.indexof(foundProduct);
    console.log(foundProductIndex);
    activeCartWProducts.splice(foundProductIndex, 1);

  localStorage.setItem("ActiveCartWProducts", JSON.stringify(activeCartWProducts));
  //   localStorage.setItem("ActiveCart", JSON.stringify(activeCart));
  }
}

}

const handleEditCart = async (productId, event) => {
  event.preventDefault();
             try{
                let myDBCartProducts = await getMyCartProductbyUserId(userId);
                if(myDBCartProducts){
               let foundProduct = myDBCartProducts.find(({ productId }) => productId === productId)
                myDBCartProducts = await patchCart(foundProduct.id, foundProduct.price, qty )
                const myCartList = await getMyCartProductbyUserId(userId);
                setProductsInCart(myCartList)
            } else {
              if (activeCartWProducts){
                let foundProduct = activeCartWProducts.find(({ productId }) => productId === productId)
               foundProduct.quantity = qty;
               localStorage.setItem("ActiveCartWProducts", JSON.stringify(activeCartWProducts));
                setProductsInCart(activeCartWProducts)
                let activeCartQtyEdit = activeCart.find(({ id }) => id === id)
                activeCartQtyEdit.quantity = qty;
                localStorage.setItem("ActiveCart", JSON.stringify(activeCart));
              }
            }
          
          }
             catch(error){
               console.log(error)
             }
         }

         const handleOrder = async() => {
           console.log("We are in order page");
           history.push('/order');
         }
        const handleShop = async() => {
          console.log("We are redirected to Shop Page");
          history.push('/Shop');
        }
  let sumPrice=0;
 useEffect(() => { (async () => {
          sumPrice=0;
            try{
              if(userId) {
              let myDBCartProducts = await getMyCartProductbyUserId(userId);
              if (myDBCartProducts){
             myDBCartProducts.map(item => {
              sumPrice += Number(item.price) * Number(item.quantity);
             }) 

             }
             setTotalPrice(sumPrice);
          } else {
            let activeCartProducts = localStorage.getItem("ActiveCartWProducts");
            console.log("activeCartProducts", activeCartProducts);
              if (activeCartProducts){
                activeCart.map(item => {
               sumPrice += Number(item.price) * Number(item.quantity);
               
             }) 
             console.log("sumPrice",sumPrice);
             setTotalPrice(sumPrice);
          }} 

        }
        catch(error){
             console.log(error)
           }  
            })();
            }, [sumPrice]);
    
        return (
        <div> 
          <div>
            <h2> Here all the items in your cart: </h2> 
            <div className="cart">
              {!productsInCart ? 
              <div> Nothing to show, yet! Add a products to your cart! </div>  : 
              <div> 
                 <div>total products:{quantityInCart}</div>
                <div>total price:{totalPrice}</div>
                {productsInCart.map(product => 
                  <>
                    <div key={product.productId}> 
                    <div className="singleProductCart">
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
                      {product.userId ? <button onClick={(id, event) => { handleDeleteCart(product.id, event) }}>Delete</button> : null}</div>
                     
                    </div>
                   
                    </>
                    
                    )}
              </div>}
            </div>
        </div>
        <div> {(productsInCart.length !== 0) && <button onClick={(event) => { handleOrder(event) }}>Submit Order</button>} </div> 
        <div> <button onClick={(event) => { handleShop(event) }}>Continue Shopping</button> </div> 
        </div>)
}


export default Cart;
