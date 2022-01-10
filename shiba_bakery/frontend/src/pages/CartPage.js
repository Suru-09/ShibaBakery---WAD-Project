import React from "react";
import '../../static/css/cart.css'
import CartItem from "../components/CartItem";
import  {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Paper, Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import GetAllProducts from "../utils/GetAllProducts";

 const CartScreen = () => {

    const [products, setProducts] = useState([]);
    const [database_prod, setDProducts] = useState([]);

    useEffect(() => {
         async function getProducts() {
            const products = JSON.parse(window.localStorage.getItem('cart') || "[]");
            console.log("Eu sunt products: ");
            console.log(products);
            const dproducts = await GetAllProducts();
            setDProducts(dproducts);
            setProducts(products);
         }
         getProducts();
    }, [])

    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    const getCartCount = () => {
        let count=0;
        for(let i = 0; i < products.length; ++i) {
            count += products[i].stock_count;
        }
        return count;
    };

    const getCartSubTotal = () => {
        let sum=0;
        for(let i = 0; i < products.length; ++i) {
            sum += (parseFloat(products[i].price) * products[i].stock_count); 
        }
        return sum;
    };

    const deleteProductCallBack = (productId) => {
        console.log("Eu sunt productId: ");
        console.log(productId);
        for(let i = 0 ; i < products.length; ++i) {
            if(products[i].id === productId) {
                products.remove(i, i);
                console.log("Intru aic:");
                console.log(products);
            }
                
        }
        window.location = document.URL;
    }

    const qtyChangeHandler = (stock, productID) => {
        console.log("Eu sunt productID:");
        console.log(productID.id);
        for(let i = 0 ; i < products.length; ++i) {
            if(products[i].id === productID) {
                products[i].stock_count = stock;
                console.log("Intru eu aici oare?");
            }
        }

        window.localStorage.setItem('cart', JSON.stringify(products));
        getCartSubTotal();
        console.log(products);
        window.location = document.URL;
    }


    return(
        <>
        <Paper elevation={12} className="cartpaper">
            <Grid  container spacing={5} direction={"row"}>
                    <Grid elevation= {8} className="cartscreen__left">
                        <h2 className="cartscreen_h2">Shopping Cart</h2>

                        {products && typeof products !== 'undefined' && products.length === 0 ? (
                            <div>
                            Your Cart Is Empty <Link to="/home">Go Back</Link>
                            </div>
                        ) : (
                            products.map((item) => (
                            <CartItem
                                key={item.id}
                                deleteProductCallBack ={(productId) => deleteProductCallBack(productId)}
                                productId={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imageUrl={item.image}
                                category={item.category}
                                stock_count={database_prod.find(element => element.id === item.id).stock_count}
                                quantity={item.stock_count}
                                qtyChangeHandler={(stock, productID) => qtyChangeHandler(stock, productID)}
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
                        <Button to="/cart/checkout" component={Link} >Proceed To Checkout</Button>
                        </div>
                    </Grid>
                </Grid>

            </Paper>
        </>
    )
}

export default withRouter(CartScreen);