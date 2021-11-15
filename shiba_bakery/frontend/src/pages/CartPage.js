import React from "react";
import '../../static/css/cart.css'
import CartItem from "../components/CartItem";
import  {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import GetAllProducts from "../utils/GetAllProducts";

 const CartScreen = () => {

   

    // const cart = useSelector((state) => state.cart);

    const cartItem = GetAllProducts;

    // const qtyChangeHandler = (id, qty) => {
    //     dispatch(addToCart(id, qty));
    //   };
    
    //   const removeFromCartHandler = (id) => {
    //     dispatch(removeFromCart(id));
    //   };
    
    //   const getCartCount = () => {
    //     return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    //   };
    
    //   const getCartSubTotal = () => {
    //     return cartItems
    //       .reduce((price, item) => price + item.price * item.qty, 0)
    //       .toFixed(2);
    //   };
    
    return(
        <>
            <div className="cart_screen">
                <div className="cartscreen__left">
            <h2>Shopping Cart</h2>

            {cartItem.length === 0 ? (
                <div>
                Your Cart Is Empty <Link to="/home">Go Back</Link>
                </div>
            ) : (
                cartItems.map((item) => (
                <CartItem
                
                    key={item.id}
                    homePageCallback={() => this.handleCallback(item.id)}
                    productId={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.image}
                    category={item.category}
                    // qtyChangeHandler={qtyChangeHandler}
                    // removeHandler={removeFromCartHandler}
                />
                ))
            )}
            </div>

            <div className="cartscreen__right">
            <div className="cartscreen__info">
                {/* <p>Subtotal ({getCartCount()}) items</p>
                <p>${getCartSubTotal()}</p> */}
            </div>
            <div>
                <button>Proceed To Checkout</button>
            </div>
            </div>
            </div>
        </>
    )
}

export default CartScreen;