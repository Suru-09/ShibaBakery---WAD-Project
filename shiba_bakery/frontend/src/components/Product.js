import "../../static/css/product.css";
import { Link } from "react-router-dom";
import React from "react";
import ProductPage from "../pages/ProductPage";
import Button from "@material-ui/core/Button";

const Product = ({ homePageCallback, imageUrl, description, price, name, category, productId }) => {

  return (
    <div className="product">
      <img src={imageUrl} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__category">#{category}</p>

        <p className="info__description">{description}</p>

        <p className="info__price">${price}</p>

          {/*{productId}*/}
        <Button to={`/product/${productId}`} component={Link} onClick={() => homePageCallback(productId)} className="info__button">
          View
        </Button>
      </div>
    </div>
    
  );
};

export default Product;


