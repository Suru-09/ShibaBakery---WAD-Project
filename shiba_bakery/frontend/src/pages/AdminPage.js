import ProductTable from '../components/ProductTable';
import UserTable from '../components/UserTable';
import React, {Component} from "react";
import '../../static/css/admin.css'
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';


export default class AdminPage extends Component {


    render(){
        return(

            <>
                <div className="pageContiner">
                    
                    <div className="titel_div">
                        <p>This id the admin page</p>
                    </div>

                    <div>
                        <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Products
                        </Link>
                        <Link underline="hover" color="inherit" href="/">
                            Users
                        </Link>
                        <Link underline="hover" color="inherit" href="/">
                            Orders
                        </Link>
                        </Breadcrumbs>
                    </div>
                    

                    <div className="produc_tab_div">
                        <ProductTable></ProductTable>
                    </div>

{/* 
                    <div className="user_tab_div">
                        <UserTable></UserTable>
                    </div> */}
                    
                    
                </div>
            </>
        );
    }
}