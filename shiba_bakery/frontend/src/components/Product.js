import "../../static/css/product.css";
import { Link } from "react-router-dom";
import React from "react";
import ProductScreen from "../pages/ProductPage";


const Product = ({ imageUrl, description, price, name, category, productId }) => {


  
  return (
    
    
    <div className="product">
      <img src={imageUrl} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__category">#{category}</p>

        <p className="info__description">{description}</p>

        <p className="info__price">${price}</p>

        <Link to={`/product/${productId}`}  className="info__button">
          View
        </Link>
      </div>
    </div>
    
  );
};

export default Product;


