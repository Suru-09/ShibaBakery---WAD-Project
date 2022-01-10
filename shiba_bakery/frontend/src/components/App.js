import React, {Component} from "react";
import { render } from "react-dom";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

//Pages
import HomePage from "../pages/HomePage"
import Footer from "./Footer"
import LoginPage from "../pages/LoginPage"
import SignUpPage from "../pages/SignUpPage";
import Navbar from "./navbar";
import ProductPage from "../pages/ProductPage";
import GetUserAfterName from "../utils/GetUserAfterUsername";
import AdminPage from "../pages/AdminPage";
import ToggleColorMode from "./Theme";
import HomeSecond from "../pages/HomeSecond";
import Cart from "../pages/Cart";
import CartScreen from '../pages/CartPage';
import Checkout from '../pages/Checkout';

//Css
import '../../static/css/app.css'

//Router
import {
    BrowserRouter as Router,
    Switch,
    Route
    }
from 'react-router-dom';
import SelectInput from "@mui/material/Select/SelectInput";

// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: 0,
            currentUserID: -1,
        }

        this.handleProductId = this.handleProductId.bind(this);
        this.handleUserSession = this.handleUserSession.bind(this);
    }

    componentDidMount() {
        // window.localStorage.clear();
        document.title = "Shiba Bakery";
    }

    handleProductId = (childData) =>{
        const user = window.localStorage.getItem('user') || "''";
        window.localStorage.setItem('product', childData);
        console.log("Eu sunt ProductId: " + childData);

        this.setState({
            currentUserID: user,
            productId: childData,
        });
    }

    handleUserSession = (childData) => {

        const getUser = async () => {
            console.log("Sunt in handlerUserSsession");
            console.log(childData);
            window.localStorage.setItem('user', childData);
            this.setState(
                {
                    currentUserID: childData,
                });
        }
        getUser();
    }

    navbarRefresh = () => {
        setTimeout(() => {  window.location = document.URL; }, 400);
    }

    render() {

        // const theme = useTheme();
        // const colorMode = React.useContext(ColorModeContext);

        return(
            
                <Router>
                    <div className="app_div">
                        <div className="footer-wrap">
                            <Navbar navbarCall={this.handleProductId} navbarRefresh={this.navbarRefresh} 
                                    userID={window.localStorage.getItem('user')} />
                            {/* {theme.palette.mode} mode
                            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton> */}

                            {/*The site will be 1 page, so this is all the switching*/}
                            <Switch>
                               <Route exact path='/login' render={(props) => <LoginPage loginCallback={this.handleUserSession} {...props} authed={true}/> }/>
                               <Route path='/adminPage' component={AdminPage}/>
                               <Route path='/sign-up' component={SignUpPage}/>
                               <Route path='/product/:productId?' render={(props) => <ProductPage productId={window.localStorage.getItem('product')} {...props} authed={true}/> }/>
                               <Route path='/home' render={(props) => <HomeSecond productCallback={this.handleProductId} productId={this.state.productId} {...props} authed={true}/> }/>
                               <Route path='/product/:productId?' render={(props) => <ProductPage productId={window.localStorage.getItem('product')} {...props} authed={true}/> }/>     
                               <Route path='/cart' component={Cart}/>
                               <Route path='/cart/cart_screen' component={CartScreen}/>
                               <Route path='/cart/checkout' component={Checkout}/>                
                               <Route path='' render={(props) => <HomeSecond productCallback={this.handleProductId} productId={this.state.productId} {...props} authed={true}/> }/>
                           </Switch>

                            <div className="footer">
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </Router>
            
        );
    }
}

const appDiv = document.getElementById("app");
render(<App name="Suru" />, appDiv);