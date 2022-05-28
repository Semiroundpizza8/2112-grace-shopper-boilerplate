export const baseUrl = 'http://localhost:4000/api';




export const addNewCart = async () => {
    let response;
    let userId = localStorage.getItem('userId')
    let cartProductId = localStorage.getItem('cartProductArray')
    
        try {
            response = await fetch(`${baseUrl}/cart`, {
            method: "POST",
            headers: {
                        'Content-Type': 'application/json',
                            },
            body: JSON.stringify(
                     {userId: userId, cartProductId: cartProductId}
                                )
                    }) 
                } catch (error) {
                    console.log("error in adding a cart!")
                   throw error;
                }
    const addedCart = await response.json()
    let cart = {
        id : addedCart.id,
        userId : userId,
        cartProductId : [cartProductId]
    };
localStorage.setItem('cart', JSON.stringify(cart));
     return addedCart;
            } 
                   
                
 export const createProductCart = async (cartId, productId, price, quantity) => {
 let response;
let userId = localStorage.getItem('userId')
// let cart = localStorage.getItem('cart')
// cartId = cart.id;
        try {
            response = await fetch(`${baseUrl}/cart/${cartId}`, {
                        method: "POST",
                        headers: {
                                    'Content-Type': 'application/json',
                                        },
                        body: JSON.stringify(
                                 {userId: userId, productId: productId, price: price, quantity: quantity}
                                            )
                                }) 
                            } catch (error) {
                                console.log("error in adding product to cart!")
                               throw error;
                            }
                const addedToCart = await response.json()
                let retrievedCart = localStorage.getItem('cart')
                retrievedCart.cartProductId.push(addedToCart.id);
            localStorage.setItem('cart', JSON.stringify(retrievedCart));
            let retrievedCartProductArray = localStorage.getItem('cartProductArray');
let cartProductArray = [];
            if(!retrievedCartProductArray){
                cartProductArray.push(addedToCart);
                 } else { 
                    cartProductArray = retrievedCartProductArray;
                    cartProductArray.push(addedToCart);
             }
             localStorage.setItem('cartPoductArray', JSON.stringify(cartProductArray));
                  return addedToCart;
                         } 

                    
     export const getMyCart = async () => {
         console.log("is it inside getmyCart ......?")
        const userId = localStorage.getItem('userId');
        const cartArray = localStorage.getItem('cartProductArray');
        const cartProductArray = localStorage.getItem('cartProductArray')
        if(localStorage.getItem('cart') === undefined || null) {
            //create a cart and assign an id
            const newCart = addNewCart();
            

            
        }
        const cart = localStorage.getItem('cart')
        
        console.log("objectCart",cart);
        const cartId = cart.id;
        
        let response;
        let fullArray = [];
        if(!userId && !cartProductArray || !cartId) {
            console.log("no cart nor userId present")
            return;
        }
       
        if (!userId && cartId){
        try { 
            response = await fetch(`${baseUrl}/cart/${cartId}`, {
            method: "GET",
            headers: {
                    'Content-Type': 'application/json',
                                }
                                
                            })
        const json = await response.json()
        fullArray.push(json);
        return fullArray;
                        } catch (error) {
                            console.log("error in getting my cart!")
                            throw [error];
                        }
                } else {
                
                        try { 
                            response = await fetch(`${baseUrl}/cart/${userId}`, {
                            method: "GET",
                            headers: {
                                    'Content-Type': 'application/json',
                                                }
                                                
                                            })
                        const json = await response.json()
                        fullArray.push(json);
                        return fullArray;
                                        } catch (error) {
                                            console.log("error in getting my cart!")
                                            throw [error];
                                        }                 
                }
            }



 export const patchCart = async (cartId, price, quantity) => {
    let response;
    
        try {
            response = await fetch(`${baseUrl}/cart/${cartId}`, {
            method: "PATCH",
            headers: {
                        'Content-Type': 'application/json',
                    },
            body: JSON.stringify(
                    {price: price, quantity: quantity}
                                    )
                                })
    const patchedCart = await response.json()
    return patchedCart;
            } catch (error) {
                console.log("error in patch carts!")
                                throw error;
                            }
                        }
                        
export const deleteCart = async (cartId) => {
        let response;
    try {
        response = await fetch(`${baseUrl}/cart/${cartId}`, {
        method: "DELETE",
        headers: {
                'Content-Type': 'application/json',
                 },
        })
    const deletedCart = await response.json()
    return deletedCart;
        } catch (error) {
    console.log("error deleting the cart!")
            throw error;
                            }
                        }