import axios from 'axios'
export const apiUrl = "http://localhost:4000";

export const getAllOrders = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    console.log("getAllOrders",response);
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};



