const apiUrl = 'http://localhost:4000/api';

export const getAllProducts = async() => {
  let response;
  try {
    response = await fetch(`${apiUrl}/products`, {
      method: "GET",
      headers: {
        'Content-Type':'application/json'
      }
    })
    const products = await response.json();
    console.log("allarray",products);
    return products;
  } catch (error) {
    
  }
}
console.log("all", getAllProducts());

export const getProductById = async (productId) => {

  let response;
  try {
      response = await fetch(`${apiUrl}/products/${productId}`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const product = await response.json()
      console.log(product);
      return product;
  } catch (error) {
      console.log("error in getProductById!")
      throw error;
  }
}

  console.log(getProductById(1));