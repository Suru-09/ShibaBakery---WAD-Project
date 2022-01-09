import ProductTable from '../components/ProductTable';
import UserTable from '../components/UserTable';
import OrderTable from '../components/OrderTable';
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
            breadcrumbs_: ['Cart' , 'Checkout']
        }
    }

    render(){
        return(
            <Router>
                <div className="pageContiner">
                    
                    <div>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Button underline="hover" color="inherit" to={'/cart/cart_screen'} component={Link}>
                                {this.state.breadcrumbs_.at(0)}
                            </Button>
                            <Button underline="hover" color="inherit" to={'/cart/checkout'} component={Link}>
                                {this.state.breadcrumbs_.at(1)}
                            </Button>
                        </Breadcrumbs>
                    </div>
                    

                    <Switch>
                        <Route exact path='/cart/cart_screen' component={CartScreen}/>
                        <Route path='/cart/checkout' component={Checkout}/>
                        <DefaultRoute path='/cart/cart_screen' component={CartScreen}/>
                    </Switch>

                    
                </div>
            </Router>
        );
    }
}