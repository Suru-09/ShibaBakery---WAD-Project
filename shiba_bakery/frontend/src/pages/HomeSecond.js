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
import '../../static/css/home.css';
import Slideshow from "../components/SlideShow";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button, TextField } from "@mui/material";


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
            page: 0,
            rowsPerPage: 12,
            category: '',
            price_min: '',
            price_max: '',
            kind: '',
        }

        this.renderHomePage = this.renderHomePage.bind(this);
        this.getData = this.getData.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.createSelectCategory = this.createSelectCategory.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeKind = this.handleChangeKind.bind(this);
        this.handleMinPriceChange = this.handleMinPriceChange.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
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

        this.handleData();

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

    async handleData(){
        console.log(this.state.products);
        let temp =[]
        for(let i = 0; i < this.state.products.length; ++i) {
            temp.push(createData(this.state.products[i].name,
                this.state.products[i].ingredients,
                this.state.products[i].price,
                this.state.products[i].category,
                this.state.products[i].description,
                this.state.products[i].image,
                this.state.products[i].stock_count
                ));
        }

        this.setState({
            productRows: temp,
        })

        console.log(temp);
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 0
        
        });
        
    }

    createSelectCategory = () =>{
        let arr = [];
        for(let i = 0; i < this.state.products.length; ++i){
            if(!(arr.includes(this.state.products[i].category))){
            arr[i] = this.state.products[i].category;
            }
        }
         return(
             arr.map((category) => {
                return(
                    <MenuItem value={category}>{category}</MenuItem>
                )
             })
         );
    };

    handleChangeCategory = (event) =>{
        this.setState({
            category: event.target.value
        
        });
    }

    handleChangeKind = (event) =>{
        this.setState({
            kind: event.target.value
        
        });
    }
    
    handleMinPriceChange = (event) => {
        this.setState({
            price_min: event.target.value
        
        });
    }

    handleMaxPriceChange = (event) => {
        this.setState({
            price_min: event.target.value
        
        });
    }

    filterProducts = () =>{

    }

    renderHomePage() {

        return (
            <>
    
                <Paper elevation={12} sx={{mx: "auto", my: "25px", width: '85%', overflow: 'hidden' }}>
                    <div className="slideshow_div">
                        <Slideshow/>
                    </div>
                    <Grid container className="filters_div" direction="row">
                        <h2 style = {{ marginLeft: "15px", marginRight: "15px"}}>Filters:</h2>
                        <Select
                            value={this.state.category}
                            lable="Category"
                            multiline
                            variant='outlined'
                            style = {{width: "200px", height: "50px", marginRight: "15px"}}
                            onChange={(event) => {this.handleChangeCategory(event)}}
                        >
                            {this.createSelectCategory()}
                        </Select>

                        <Select
                            value={this.state.kind}
                            lable="Kind"
                            multiline
                            variant='outlined'
                            style = {{width: "200px",height: "50px", marginLeft: "15px", marginRight: "15px"}}
                            onChange={(event) => {this.handleChangeKind(event)}}
                        >
                            <MenuItem value={"Vegan"}>{"Vegan"}</MenuItem>
                            <MenuItem value={"Non Vegan"}>{"Non Vegan"}</MenuItem>
                        </Select>

                        <TextField
                                    id="price_min"
                                    onChange={this.handleMinPriceChange}
                                    style = {{width: "200px",height: "40px", marginLeft: "15px", marginRight: "15px"}}
                                    label="Min"
                                    variant="outlined"
                                    placeholder=""
                                    margin="none"
                        />
                        
                        <TextField
                                    id="price_max"
                                    onChange={this.handleMaxPriceChange}
                                    style = {{width: "200px",height: "40px", marginLeft: "15px", marginRight: "15px"}}
                                    label="Max"
                                    variant="outlined"
                                    placeholder=""
                                    margin="none"
                            />

                        <Button color="primary"
                            variant="contained"
                            style = {{width: "150px",height: "50px", marginLeft: "15px", marginRight: "15px"}}> 
                            Reset filters
                        </Button>
                        
                    </Grid>
                    <Grid container spacing={5} direction={"column"}>
                        <div className="product_div">
                            
                            
                            <Grid  container spacing={5} direction={"row"}>
                                
                                { this.state.products
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((product) => {
                                        return(
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
                                        )
                                    })
                                }
                                
                            </Grid>
                        </div>
                    </Grid>
                <TablePagination
                rowsPerPageOptions={[12, 24, 36]}
                component="div"
                count={this.state.productRows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
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