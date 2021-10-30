import React, {Component} from "react";
import SignUpPage from "./SignUpPage"
import LoginPage from "./LoginPage"
import { render } from "react-dom";
import { BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"; 
import { Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import Navbar from "../components/navbar";
import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// Components
import Product from "../components/Product";

//Actions
// import { getProducts as listProducts } from "../redux/actions/productActions";


export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.renderHomePage = this.renderHomePage.bind(this);
    }

    //  dispatch = useDispatch();

    //  getProducts = useSelector((state) => state.getProducts);
    //  { products, loading, error } = getProducts;
  
    // useEffect(() => {
    //   dispatch(listProducts());
    // }, [dispatch]);
  
    
    renderHomePage() {

        return (
            <>
                <Grid>
                <div className="homescreen">
                    <h2 className="homescreen__title">Latest Products</h2>
                    <div className="homescreen__products">
                        {loading ? (
                        <h2>Loading...</h2>
                        ) : error ? (
                        <h2>{error}</h2>
                        ) : (
                        products.map((product) => (
                            <Product
                            key={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            productId={product._id}
                            />
                        ))
                        )}
                     </div>
                </div>
                </Grid>
            </>

        );
    }

    render() {
        return(
            <Router>
                <Switch>
                    {/* <Route exact path='/home'>
                        {this.renderHomePage()}
                    </Route>
                    <Route path='/sign-up' component={SignUpPage}></Route>
                    <Route path='/login' component={LoginPage}></Route> */}
                </Switch>
            </Router>
        );
    }

}