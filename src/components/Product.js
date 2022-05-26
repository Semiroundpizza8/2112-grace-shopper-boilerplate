// import React from "react";
// import "../style/Product.css";

// function Product({ id, title, image, price, rating, alt }) {
//   return (
//     <div className="product">
//       <div className="product__info">
//         <p>{title}</p>
//         <p className="product__price">
//           <small>$</small>
//           <strong>{price}</strong>
//         </p>
//         <div className="product__rating">
//           {Array(rating)
//             .fill()
//             .map((_, i) => (
//               <p>🌟</p>
//             ))}
//         </div>
//       </div>

//       <img src={image} alt={alt} />

//       <button>Add to Cart</button>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductById } from '../axios-services/productScreen';


const Products = (props) => {
    
    const {products, setProducts} = props;
    

      useEffect(() => {
        (async () => {
          const products = await getAllProducts();
          console.log("allproducts",products);
          setProducts(products);
        })();
    }, []);

    
    
    return (
        
      <div>
     
         {
             products.map((product) => 
                  <div key = {product.id}>
                      <h2>Product Name : {product.name}</h2>
                      <h2>Product Description : {product.description}</h2>
                      <img src={product.image} alt='Image not found'/>
                  </div>
             )
          }
        </div>

    );
};



export default Products;
