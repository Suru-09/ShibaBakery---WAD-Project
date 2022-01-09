import React from "react";
import '../../static/css/cart.css'
import CartItem from "../components/CartItem";
import  {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import GetAllProducts from "../utils/GetAllProducts";
import GetProductAfterId from "../utils/GetProductAfterId";
import { Paper, Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";

 const CartScreen = () => {

    const [products, setProducts] = useState('');

    useEffect(() => {
         async function getProducts() {
            const products = await GetAllProducts();
            setProducts(products);
         }
         getProducts();
    }, [])

    const getCartCount = () => {
        let count=0;
        for(let i = 0; i < products.length; ++i) {
            count++;
        }
        return count;
    };

    const getCartSubTotal = () => {
        let sum=0;
        for(let i = 0; i < products.length; ++i) {
            sum += parseFloat(products[i].price); 
        }
        return sum;
    };


    return(
        <>
        <Paper elevation={12} className="cartpaper">
            <Grid  container spacing={5} direction={"row"}>
                    <Grid elevation= {8} className="cartscreen__left">
                        <h2 className="cartscreen_h2">Shopping Cart</h2>

                        {products.length === 0 ? (
                            <div>
                            Your Cart Is Empty <Link to="/home">Go Back</Link>
                            </div>
                        ) : (
                            products.map((item) => (
                            <CartItem

                                key={item.id}
                                //homePageCallback={() => this.handleCallback(item.id)}
                                productId={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imageUrl={item.image}
                                category={item.category}
                                stock_count={item.stock_count}
                                quantity={1}
                                // qtyChangeHandler={qtyChangeHandler}
                                // removeHandler={removeFromCartHandler}
                            />
                            ))
                        )}
                    </Grid>

                    <Grid elevation= {8} className="cartscreen__right">
                        <div className="cartscreen__info">
                            <p className="cart_info">Number of items: {getCartCount()}</p>
                            <p className="cart_info">Toatal : {getCartSubTotal()}$</p>
                        </div>
                        <div>
                        <Button to="/checkout" component={Link}>Proceed To Checkout</Button>
                        </div>
                    </Grid>
                </Grid>

            </Paper>
        </>
    )
}

export default CartScreen;