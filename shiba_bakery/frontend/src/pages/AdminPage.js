import ProductTable from '../components/ProductTable';
import UserTable from '../components/UserTable';
import OrderTable from '../components/OrderTable';
import React, {Component} from "react";
import { Breadcrumbs, Button } from '@mui/material';
import '../../static/css/admin.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    DefaultRoute,
    Link
    }
from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import AddProduct from './AddProduct';
import { Grid } from '@material-ui/core';


export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breadcrumbs_: ['Products' , 'Users', 'Orders']
        }
    }

    render(){
        return(
            <Router>
                <div className="pageContiner">
                    
                    {/* <div className="titel_div">
                        <p>This id the admin page</p>
                    </div> */}

                    <div>
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

                    <Switch>
                        <Route exact path='/adminPage/ProductTable' component={ProductTable}/>
                        <Route path='/adminPage/UserTable' component={UserTable}/>
                        <Route path='/adminPage/OrderTable' component={OrderTable}/>
                        <DefaultRoute path='/adminPage/ProductTable' component={ProductTable}/>
                    </Switch>

                    {/* <Grid  container spacing={20} direction={"row"}>
                        <div>
                            <UpdateProduct/>
                        </div>

                        <div>
                            <AddProduct/>
                        </div>
                    </Grid> */}
                </div>
            </Router>
        );
    }
}