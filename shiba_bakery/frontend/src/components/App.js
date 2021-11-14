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
import GetUserAfterName from "../utils/GetUserAfterUsername";

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
            currentUserID: -1,
        }

        this.handleProductId = this.handleProductId.bind(this);
        this.handleUserSession = this.handleUserSession.bind(this);
    }

    componentDidMount() {
        document.title = "Shiba Bakery";
        const user = window.localStorage.getItem('user');
        const product = window.localStorage.getItem('product');
        console.log(user);
        console.log("Component DidMount: " + product);

        this.setState({
            currentUserID: user,
            productId: product
        });
    }

    handleProductId = (childData) =>{
        const user = window.localStorage.getItem('user');
        window.localStorage.setItem('product', childData);
        console.log("Eu sunt ProductId: " + childData);

        this.setState({
            currentUserID: user,
            productId: childData,
        });
    }

    handleUserSession = (childData) => {

        const getUser = async () => {
            //const user = await GetUserAfterName(childData);
            console.log("Sunt in handlerUserSsession");
            console.log(childData);
           // console.log(user);
            window.localStorage.setItem('user', childData);
            this.setState(
                {
                    currentUserID: childData,
                });
        }
        getUser();
    }

    render() {

        return(
            <>
                <Router>
                    <div className="app_div">
                        <div className="footer-wrap">
                            <Navbar navbarCall={this.handleProductId} userID={this.state.currentUserID} />

                            {/*The site will be 1 page, so this is all the switching*/}
                            <Switch>
                               <Route exact path='/login' render={(props) => <LoginPage loginCallback={this.handleUserSession} {...props} authed={true}/> }/>
                               <Route  path='/sign-up' component={SignUpPage}/>
                               <Route  path='/cart_screen' component={CartScreen}/>
                               <Route path='/home' render={(props) => <HomePage productCallback={this.handleProductId} productId={this.state.productId} {...props} authed={true}/> }/>
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