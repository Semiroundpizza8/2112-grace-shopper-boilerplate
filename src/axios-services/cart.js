export const baseUrl = 'http://localhost:4000/api';


export const addToCart = async ({userId, productId, price, quantity}) => {
    let response;
        try {
            response = await fetch(`${baseUrl}/cart`, {
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
    let cartArray = [];
    let retrievedArray = localStorage.getItem('cartArray')
    let cart = addedToCart;
    if(!retrievedArray){
   cartArray.push(cart); 
    } else { 
    cartArray = retrievedArray;
    cartArray.push(cart);
}
localStorage.setItem('cartArray', JSON.stringify(cartArray));
     return addedToCart;
            } 
                   
                

                    
     export const getMyCart = async () => {
        const userId = localStorage.getItem('userId');
        const cartArray = localStorage.getItem('cartArray');
        let response;
        let fullArray = [];
        if (!userId){
        try { 
            response = await fetch(`${baseUrl}/cart/${cartArray}`, {
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
                            response = await fetch(`${baseUrl}/cart/user/${userId}`, {
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