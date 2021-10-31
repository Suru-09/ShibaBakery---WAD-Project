import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"; 
import { Grid} from "@material-ui/core";
import Product from "../components/Product";
import GetCookie from "../utils/GetCookie";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }

        this.renderHomePage = this.renderHomePage.bind(this);
        this.getData = this.getData.bind(this);
    }

    async getData() {
        const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": GetCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };


        const response = await fetch('api/get-product', requestOptions);
        const products = await response.json();

        this.setState({
           products: products
        });
    }

    componentDidMount() {
        this.getData();
    }

    renderHomePage() {

        return (
            // <>
            //     <Grid>
            //     <div className="homescreen">
            //         <h2 className="homescreen__title">Latest Products</h2>
            //         <div className="homescreen__products">
            //             {loading ? (
            //             <h2>Loading...</h2>
            //             ) : error ? (
            //             <h2>{error}</h2>
            //             ) : (
            //             this.state.products.map((product) => (
            //                 <Product
            //                 name={product.name}
            //                 description={product.description}
            //                 price={product.price}
            //                 imageUrl={product.image}
            //                 />
            //             ))
            //             )}
            //          </div>
            //     </div>
            //     </Grid>
            // </>
            <>

            </>

        );
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path='/home'>
                        {this.renderHomePage()}
                    </Route>
                </Switch>
            </Router>
        );
    }

}