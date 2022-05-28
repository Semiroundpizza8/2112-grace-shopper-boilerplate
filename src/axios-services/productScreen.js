import axios from 'axios'
export const apiUrl = "http://localhost:4000";

export const getAllProducts = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    console.log("getAllProducts",response);
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getProductById = async (productId) => {
  let response;
  try {
    response = await fetch(`${apiUrl}/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const product = await response.json();
    console.log(product);
    return product;
  } catch (error) {
    console.log("error in getProductById!");
    throw error;
  }
};

console.log(getProductById(1));
