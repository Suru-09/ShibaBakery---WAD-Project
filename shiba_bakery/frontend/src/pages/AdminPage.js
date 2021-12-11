import ProductTable from '../components/ProductTable';
import UserTable from '../components/UserTable';
import React, {Component} from "react";
import '../../static/css/admin.css'
import { Breadcrumbs, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Switch, TextField } from '@material-ui/core';
import { Box } from '@mui/system';


export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: -1,
            breadcrumbs_: ['Products' , 'Users', 'Orders']
        }

        this.renderProducts = this.renderProducts.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.setStateValue = this.setStateValue.bind(this);
        this.switchParam = this.switchParam.bind(this);
    }

    setStateValue(nr){
        this.state.value =  nr;
        console.log("This is state value: " + this.state.value);
        window.location = document.URL;
    }

    switchParam(nr){
        
        console.log(nr)
        switch(nr) 
        {
            case 0:  return(this.renderProducts());
            case 1:  return(this.renderUsers());
            case 2:  return(this.renderProducts());
            default: return(this.renderProducts());
        }
        
    }

    renderProducts(){
        
        return(
        
            <div className="produc_tab_div">
                <ProductTable></ProductTable>
            </div>
        );
    }

    renderUsers(){
    
        return(
        <div className="user_tab_div">
            <UserTable></UserTable>
        </div>
        );
    }

    render(){
        return(

            <>
                <div className="pageContiner">
                    
                    <div className="titel_div">
                        <p>This id the admin page</p>
                    </div>

                    <div>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Button underline="hover" color="inherit" onClick = {() => {this.setStateValue(0)}}>
                                {this.state.breadcrumbs_.at(0)}
                                {/* {console.log(this.state.value)} */}
                            </Button>
                            <Button underline="hover" color="inherit" onClick = {() => {this.setStateValue(1)}}>
                                {this.state.breadcrumbs_.at(1)}
                            </Button>
                            <Button underline="hover" color="inherit" onClick = {() => {this.setStateValue(2)}}>
                                {this.state.breadcrumbs_.at(2)}
                            </Button>
                        </Breadcrumbs>
                    </div>

                    {/* {this.renderProducts()} */}
                    {
                        this.switchParam(this.state.value) 
                        
                    }
                    

                    
                </div>
            </>
        );
    }
}