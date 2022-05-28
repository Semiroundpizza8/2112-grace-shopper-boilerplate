import React, { useEffect, useState } from "react";
import { getAllProducts } from "../axios-services/productScreen";
 import Product from "./Product";
 import {Link} from 'react-router-dom'

const AllProducts = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      const products = await getAllProducts();
      console.log("Testing Grabing All Products", products);
      setProductList(products);
    })();
  }, []);

  return (
    <div className="product__section">
      <div className="product__list">
        {productList.map((product) => {
          const { id, name, image, price, rating } = product;
          return (
            <>
           <Product
              id={id}
              title={name}
              price={price}
              rating={rating}
              image = {image}
            />
            </>
          );
        })}
      </div>
    </div>
  );
};
export default AllProducts;
