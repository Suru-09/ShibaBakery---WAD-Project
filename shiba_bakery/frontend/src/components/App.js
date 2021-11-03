import React, {Component} from "react";
import { render } from "react-dom";

//Pages
import HomePage from "../pages/HomePage"
import Footer from "./Footer"
import LoginPage from "../pages/LoginPage"
import SignUpPage from "../pages/SignUpPage";
import CartScreen from "../pages/CartPage";
import Navbar from "./navbar";
import ProductPage from "../pages/ProductPage";

//Css
import '../../static/css/app.css'

//Router
import {
    BrowserRouter as Router,
    Switch,
    Route
    }
from 'react-router-dom';




export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = "Shiba Bakery";
    }

    render() {

        return(
            <>
                <Router>
                    <div className="app_div">
                        <div className="footer-wrap">
                            <Navbar/>

                            {/*The site will be 1 page, so this is all the switching*/}
                            <Switch>
                               <Route exact path='/login' component={LoginPage}/>
                               <Route  path='/sign-up' component={SignUpPage}/>
                               <Route  path='/cart_screen' component={CartScreen}/>
                               <Route path='/home' component={HomePage}/>
                               {/*<Route path='/product/${productId}' render={(props) => <ProductPage productId={props.match.params.id} {...props} /> }/>*/}
                           </Switch>

                            <div className="footer">
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </Router>
            </>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App name="Suru" />, appDiv);