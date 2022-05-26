export const baseUrl = 'http://localhost:4000/api';


export const addToCart = async ({productId, price, quantity}) => {
    let response;
        try {
            response = await fetch(`${baseUrl}/cart`, {
            method: "POST",
            headers: {
                        'Content-Type': 'application/json',
                            },
            body: JSON.stringify(
                     {productId: productId, price: price, quantity: quantity}
                                )
                    })
    const addedToCart = await response.json()
    localStorage.setItem('cartId', json.id);
     return addedToCart;
            } catch (error) {
                 console.log("error in adding product to cart!")
                throw error;
                        }
                    }

                    
     export const getMyCart = async () => {
        const cartId = localStorage.getItem('cartId');
        let response;
        try { 
            response = await fetch(`${baseUrl}/cart/${cartId}`, {
            method: "GET",
            headers: {
                    'Content-Type': 'application/json',
                                }
                                
                            })
        const json = await response.json()
        return json;
                        } catch (error) {
                            console.log("error in getting my cart!")
                            throw [error];
                        }
                        
                    };





 export const patchCart = async (price, quantity) => {
    const cartId = localStorage.getItem('cartId');
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
                        
export const deleteCart = async () => {
    const cartId = localStorage.getItem('cartId');
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