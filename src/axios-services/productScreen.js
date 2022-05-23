import axios from 'axios';
export const apiUrl = 'http://localhost:4000';


export const getAllProducts = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getProductById = async (id) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/products/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
  };

  console.log(getProductById(1));