import React, { useEffect, useState } from "react";
import { getProductById } from "../axios-services/productScreen";
import {useParams, useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";


const ProductScreen = () => {
  
const { id } = useParams();
const [singleProduct, setSingleProduct] = useState({})

useEffect(() => {
    (async () => {
        const singleProduct = await getProductById(id);
        console.log("singleproduct",singleProduct);
        setSingleProduct(singleProduct);
    })();
  }, []);


  return (
    <div className="product">
        
        <img src = {singleProduct.image} alt={singleProduct.name}></img>
        <h1>Name : {singleProduct.name}</h1>
        <p>Description : {singleProduct.description}</p>
        <strong> Price : {singleProduct.price}</strong>
        <button>Add to Cart</button>
        <Link to = "/Shop"> Go Back to Home Page </Link>
        
      
    </div>
  );
};

export default ProductScreen;
