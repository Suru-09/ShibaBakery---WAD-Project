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
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            productId: 0,
        }

        this.handleCallback = this.handleCallback.bind(this);
    }

    setState(state) {
        window.localStorage.setItem('state', JSON.stringify(state));
        super.setState(state);
    }
  
    componentDidMount() {
        document.title = "Shiba Bakery";
    }

    handleCallback = (childData) =>{
        this.setState(
            {productId: childData})
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
                               <Route path='/home' render={(props) => <HomePage productCallback={this.handleCallback} productId={this.state.productId} {...props} authed={true}/> }/>
                               <Route path='/product/:productId?' render={(props) => <ProductPage productId={this.state.productId} {...props} authed={true}/> }/>
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