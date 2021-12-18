import React, {Component} from "react";
import { Grid} from "@material-ui/core";
import Product from "../components/Product";
import GetCookie from "../utils/GetCookie";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';

function createData(name, ingredients, price, category, 
    description, image, stock_count) {
    return { 
        name,
        ingredients,
        price, 
        category,
        description,
        image,
        stock_count
    };
}

export default class HomeSecond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productRows: [],
            selectedProduct: 0,
            // [page, setPage]: React.useState(0),
            // [rowsPerPage, setRowsPerPage]: React.useState(10),
        }

        this.renderHomePage = this.renderHomePage.bind(this);
        this.getData = this.getData.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
        this.handleData = this.handleData.bind(this);
        // this.handleChangePage = this.handleChangePage.bind(this);
        // this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }


    async getData() {

        const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": GetCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('/api/get-product', requestOptions);
        const products = await response.json();

        this.setState({
           products: products
        });
    }

     handleCallback = (childData) =>{
        this.props.productCallback(childData);
        this.setState({
            selectedProduct: childData,
        });
    }

    componentDidMount() {
        this.getData().then();
    }

    handleData(){
        for(let i = 0; i < this.state.products.length; ++i) {
            this.state.productRows.push(createData(this.state.products[i].name,
                this.state.products[i].ingredients,
                this.state.products[i].price,
                this.state.products[i].category,
                this.state.products[i].description,
                this.state.products[i].image,
                this.state.products[i].stock_count
                ));
        }
    }

    // handleChangePage = (event, newPage) => {
    //     this.state.setPage(newPage);
    // };

    // handleChangeRowsPerPage = (event) => {
    //     this.state.setRowsPerPage(+event.target.value);
    //     this.state.setPage(0);
    // }

    renderHomePage() {

        return (
            <>
    
                     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            
                            <TableBody>
                            
                            {this.state.productRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    
                                    return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                
                                                { this.state.products.map((product) => {
                                                    return(
                                                        <TableCell>
                                                            <Product
                                                            key={product.id}
                                                            homePageCallback={() => this.handleCallback(product.id)}
                                                            productId={product.id}
                                                            name={product.name}
                                                            description={product.description}
                                                            price={product.price}
                                                            imageUrl={product.image}
                                                            category={product.category}
                                                            />
                                                        </TableCell>
                                                        )
                                                    })
                                                }
                                            </TableRow>
                                    );
                                })
                            }
                            </TableBody>
                        </Table>
                        
                        </TableContainer>
                        <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={this.state.productRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        // onPageChange={this.handleChangePage}
                        // onRowsPerPageChange={this.handleChangeRowsPerPage}
                        />
                        
                        
                    </Paper>

            </>
        );
    }

    render() {
        return(
            <>
                {this.renderHomePage()}
            </>

        );
    }

}