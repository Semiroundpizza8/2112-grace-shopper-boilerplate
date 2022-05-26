import React, { useEffect, useState } from "react";
import { getAllProducts } from "../axios-services/productScreen";
import Product from "./Product";

const AllProducts = (products) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      const products = await getAllProducts();
      console.log("Testing Grabing All Products", products);
      setProductList(products.products);
    })();
  }, []);

  return (
    <div className="product__section">
      <div className="product__list">
        {productList.map((product) => {
          const { id, title, image, price, rating } = product;
          return (
            <Product
              id={id}
              title={title}
              price={price}
              image={image}
              rating={rating}
            />
          );
        })}
      </div>
    </div>
  );
};
export default AllProducts;
