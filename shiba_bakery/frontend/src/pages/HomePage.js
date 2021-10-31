import React, {Component} from "react";

import { BrowserRouter as Router,
    Switch,
} from "react-router-dom"; 
import { Grid} from "@material-ui/core";

import Product from "../components/Product";


export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.renderHomePage = this.renderHomePage.bind(this);
    }

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