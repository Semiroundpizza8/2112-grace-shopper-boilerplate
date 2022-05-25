import React, { useEffect, useState } from "react";
import { getAllProducts } from "../axios-services/productScreen";

const AllProducts = (props) => {
  const [productList, setProductList] = useState("");
  useEffect(() => {
    (async () => {
      const productList = await getAllProducts();
      console.log("all", productList);
      setProductList(productList);
    })();
  }, []);

  return (
    <div>
      <p key={productList.id}>{productList.name}</p>
    </div>
  );
};

export default AllProducts;
