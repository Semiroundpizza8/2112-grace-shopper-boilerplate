export const baseUrl = 'http://localhost:4000/api';




export const addNewCart = async () => {
    let response;
    let userId = localStorage.getItem('userId')
    let cartProduct = JSON.parse(localStorage.getItem('cartProductArray'))
    console.log("cproduct",cartProduct);
    
        try {
            response = await fetch(`${baseUrl}/cart`, {
            method: "POST",
            headers: {
                        'Content-Type': 'application/json',
                            },
            body: JSON.stringify(
                     {userId: userId, cartProduct: cartProduct}
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
        cartProduct : [cartProduct]
    };
localStorage.setItem('cart', JSON.stringify(cart));
     return addedCart;
            } 
                   
                
 export const createProductCart = async (userId, productId, price, quantity) => {
 let response;
//userId = localStorage.getItem('userId');
//let cart = localStorage.getItem('cart')
//cartId = cart.id;
console.log("I'm inside createProductCart")
//console.log("cartId", cartId)
        try {
            response = await fetch(`${baseUrl}/cart/`, {
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
                console.log("cartresponse",addedToCart)
                // let retrievedCart = JSON.parse(localStorage.getItem('cart'));
                // retrievedCart.cartProductId.push(addedToCart);
                console.log(addedToCart);
                //console.log(retrievedCart);
            // localStorage.setItem('cart', JSON.stringify(retrievedCart));
//             let retrievedCartProductArray = JSON.parse(localStorage.getItem('cartProductArray'));
// let cartProductArray = [];
//             if(!retrievedCartProductArray){
//                 cartProductArray.push(addedToCart);
//                  } else { 
//                     cartProductArray = retrievedCartProductArray;
//                     cartProductArray.push(addedToCart);
//              }
//              localStorage.setItem('cartPoductArray', JSON.stringify(cartProductArray));
                  return addedToCart;
                         } 

 export const getMyCartProductbyUserId = async (userId) => {
 console.log("i'm inside getMyCartProductbyUserId")
                            let response;
                           try { 
                                response = await fetch(`${baseUrl}/cart/${userId}`, {
                                method: "GET",
                                headers: {
                                        'Content-Type': 'application/json',
                                        }
                                })
                                            const json = await response.json()
                                            console.log("response getMyCartProductbyUserId", json)
                                            return json;
 
                             } catch (error) {
                                console.log("error in getting my cart!")
                                }                 
                     }
                    
                    //  export const getMyCartbyTemporaryCartId = async (cartId) => {
                     
                    //     let response;
                    //    try { 
                    //         response = await fetch(`${baseUrl}/cart/${cartId}`, {
                    //         method: "GET",
                    //         headers: {
                    //                 'Content-Type': 'application/json',
                    //                 }
                    //         })
                    //                     const json = await response.json()
                    //                     return json;
                    //      } catch (error) {
                    //         console.log("error in getting my cart!")
                    //         }                 
                    // }
                    



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