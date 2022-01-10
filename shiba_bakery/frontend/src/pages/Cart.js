import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    DefaultRoute,
    Link
    }
from 'react-router-dom';
import { Grid } from '@material-ui/core';
import CartScreen from './CartPage';
import Checkout from './Checkout';
import { Breadcrumbs, Button } from '@mui/material';


export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <Router>
                <div className="pageContiner">

                    <Switch>
                         <Route exact path='/cart/cart_screen' render={(props) => <CartScreen {...props} authed={true}/> }/>
                         <Route path='/cart/checkout' component={Checkout}/>
                         <Route path='/cart' render={(props) => <CartScreen {...props} authed={true}/> }/>
                     </Switch>

                    
            </div>
            </Router>
        );
    }
}