import '../../static/css/cartItem.css';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";

const CartItem = ({ homePageCallback, imageUrl, description, price, name, category, productId, stock_count }) => {
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={imageUrl} alt={name} />
      </div>
      <Button to={`/product/${productId}`} component={Link} onClick={() => homePageCallback(productId)} className="info__button">
          View
        </Button>
      <p className="cartitem__price">${price}</p>
      
      <select
        value={stock_count}
        // onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="cartItem__select"
      >
        {/* {[...Array(stock_count).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))} */}
      </select>
      <button
        className="cartItem__deleteBtn"
        // onClick={() => removeHandler(item.product)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
