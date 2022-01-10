import React, {Component} from "react";
import { Breadcrumbs, Button } from '@mui/material';
import '../../static/css/admin.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
    }
from 'react-router-dom';

import UpdateProduct from './UpdateProduct';
import AddProduct from './AddProduct';
import AddUser from "./AddUser";
import ProductTable from '../components/ProductTable';
import UserTable from '../components/UserTable';
import OrderTable from '../components/OrderTable';
import AddOrder from "./AddOrder";
import HandleOrder from "./HandleOrder";
import { Paper } from "@material-ui/core";


export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breadcrumbs_: ['Products' , 'Users', 'Orders'],
            updateProduct: {},
        }

        this.handleProduct = this.handleProduct.bind(this);
    }

    handleProduct(product) {
        this.setState({
            updateProduct: product
        })

    }

    render(){
        return(
            <Paper className="pageContainer">
                <Router>
                    <div className="page_div">
                        <div className="bradcrumbs_div">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Button underline="hover" color="inherit" to={'/adminPage/ProductTable'} component={Link}>
                                    {this.state.breadcrumbs_.at(0)}
                                </Button>
                                <Button underline="hover" color="inherit" to={'/adminPage/UserTable'} component={Link}>
                                    {this.state.breadcrumbs_.at(1)}
                                </Button>
                                <Button underline="hover" color="inherit" to={'/adminPage/OrderTable'} component={Link}>
                                    {this.state.breadcrumbs_.at(2)}
                                </Button>
                            </Breadcrumbs>
                        </div>

                    
                        <div className="switch_div">
                            <Switch>
                                <Route exact path='/adminPage/ProductTable'
                                        render={(props) =>
                                        <ProductTable productCallBack={this.handleProduct}
                                                        {...props}
                                                        authed={true}/>
                                        }
                                />
                                <Route path='/adminPage/addProduct' component={AddProduct}/>
                                <Route path='/adminPage/updateProduct'
                                    render={(props) =>
                                        <UpdateProduct product={this.state.updateProduct}
                                                        {...props}
                                                        authed={true}/>
                                    }/>
                                <Route path='/adminPage/UserTable' component={UserTable}/>
                                <Route path='/adminPage/addUser' component={AddUser}/>
                                <Route path='/adminPage/OrderTable' component={OrderTable}/>
                                <Route path='/adminPage/addOrder' component={AddOrder}/>
                                <Route path='/adminPage/handleOrder' component={HandleOrder}/>
                                <Route path='/adminPage'
                                   render={(props) =>
                                   <ProductTable productCallBack={this.handleProduct}
                                                  {...props}
                                                  authed={true}/>
                                   }
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Paper>
        );
    }
}