import '../../static/css/cartItem.css';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";

// const qtyChangeHandler = (id, qty) => {
//         dispatch(addToCart(id, qty));
// };

const CartItem = ({ homePageCallback, imageUrl, description, price, name, category, productId, stock_count }) => {

    const changeSelectValue = (value) => {
        stock_count = value;
        console.log(value);
    }

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img className="image" src={imageUrl} alt={name} />
      </div>
      <Button to={`/product/${productId}`} component={Link} className="info__button">
          View
        </Button>
      <p className="cartitem__price">${price}</p>
      
      <select
        value={stock_count}
        onChange={(e) => {
            changeSelectValue(e.target.value);
            stock_count = e.target.value;
        }}
        className="cartItem__select"
      >
        {[...Array(stock_count).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cartItem__deleteBtn"
        // onClick={() => removeHandler(item.product)}
      >
        <i className="fas fa-trash"/>
      </button>
    </div>
  );
};

export default CartItem;
