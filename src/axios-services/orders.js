import axios from 'axios'
export const baseUrl = 'http://localhost:4000/api';


export const createOrders = async ({email,street,city,zipcode,country,phone}) => {
  let response;
 
 console.log("I'm inside createOrder");
 const userId = localStorage.getItem("userId");
 
         try {
             response = await fetch(`${baseUrl}/order`, {
                         method: "POST",
                         headers: {
                                     'Content-Type': 'application/json',
                                         },
                         body: JSON.stringify(
                                  { 
                                    email : email,
                                    street : street,
                                    city : city,
                                    zipcode : zipcode,
                                    country: country,
                                    phone : phone,
                                    userId:userId
                                  }
                                )
                                 }) 
                                 console.log("responsefromorder",response);
                                 const orderconfirmation = await response.json()
                                  console.log("orderresponse",orderconfirmation)
                                   return orderconfirmation;
                             } catch (error) {
                                 console.log("error in adding order",error)
                                
                             }
                 
     
          
 
                   
} 
export const getAllOrders = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/orders`,
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



