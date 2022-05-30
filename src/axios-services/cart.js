export const baseUrl = 'http://localhost:4000/api';




// export const addNewCart = async () => {
//     let response;
//     let userId = localStorage.getItem('userId')
//     let cartProduct = JSON.parse(localStorage.getItem('cartProductArray'))
//     console.log("cproduct",cartProduct);
    
//         try {
//             response = await fetch(`${baseUrl}/cart`, {
//             method: "POST",
//             headers: {
//                         'Content-Type': 'application/json',
//                             },
//             body: JSON.stringify(
//                      {userId: userId, cartProduct: cartProduct}
//                                 )
//                     }) 
//                 } catch (error) {
//                     console.log("error in adding a cart!")
//                    throw error;
//                 }
//     const addedCart = await response.json()
//     let cart = {
//         id : addedCart.id,
//         userId : userId,
//         cartProduct : [cartProduct]
//     };
// localStorage.setItem('cart', JSON.stringify(cart));
//      return addedCart;
//             } 
                   
                
 export const createProductCart = async (userId, productId, price, quantity) => {
 let response;

console.log("I'm inside createProductCart")

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
    
                console.log(addedToCart);

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