import React from "react";
import "../style/Product.css";
import { Link } from "react-router-dom";

function Product({ id, title, image, price, reviewstars, alt }) {
  return (
    <div className="product" key={id}>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(reviewstars)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <Link to={`/products/${id}`}>
        <img src={image} alt={alt} />
      </Link>
    </div>
  );
}

export default Product;
