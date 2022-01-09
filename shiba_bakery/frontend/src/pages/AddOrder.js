import React, { Component} from 'react';
import {
    Grid,
    Paper,
    TextField,
    Button, MenuItem, Checkbox, ListItemText,

} from '@material-ui/core';

import {Select, OutlinedInput} from '@mui/material'
import GetAllUsers from "../utils/GetAllUsers";
import GetAllProducts from "../utils/GetAllProducts";
import GetCookie from "../utils/GetCookie";


export default class AddOrder extends Component{

    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            product: [],
            status: "",
            users: [],
            products: [],
        }

        this._renderCreateButtons = this._renderCreateButtons.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this._handleProductChange = this._handleProductChange.bind(this);
        this._handleCustomerChange= this._handleCustomerChange.bind(this);
        this._handleStatusChange = this._handleStatusChange.bind(this);
        this._addOrderButtonPressed = this._addOrderButtonPressed.bind(this);

    }

    getAllUsers() {
        const getUsers = async () => {
            const usersRepo = await GetAllUsers();
            console.log(usersRepo);
            this.setState(
                {
                    users: usersRepo,
                });
        }
        getUsers();
    }

    getAllProducts() {
        const getProducts = async () => {
            const productsRepo = await GetAllProducts();
            console.log(productsRepo);
            this.setState(
                {
                    products: productsRepo,
                });
        }
        getProducts();
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllProducts();
        console.log(this.state.users);
        console.log(this.state.products);
    }

    _addOrderButtonPressed(e) {
        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": GetCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                status: this.state.status,
                product: this.state.product,
                customer: this.state.customer,
            }),
        };

        fetch('/api/add-order', requestOptions).then((response) => {
            if(response.ok) {
                console.log("Am reusit");
                this.props.history.push('/adminPage/OrderTable');
            }
            else {
                console.log("Am esuat rau de tot!");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    _handleCustomerChange(e) {
        console.log(e.target.value);
        this.setState({
            customer: e.target.value
        });
    }

    _handleProductChange(e) {
        this.setState({
            product: e.target.value
        });

        console.log("Eu sunt target value : " + e.target.value);
        console.log("Eu sunt product: " + this.state.product);
    }

    _handleStatusChange(e) {
        console.log(e.target.value);
        this.setState({
            status: e.target.value
        });
    }

    _renderCreateButtons() {
        return(
            
                <Grid item align="center" >
                    <Button color="primary"
                            variant="contained"
                            onClick={this._addOrderButtonPressed}
                            >
                        Add
                    </Button>
                </Grid>
           
        );
    }

    render(){
        const PaperStyle={
            padding: '30px 20px 50px',
            margin: "20px auto",
            width: 300,

        }

        const HeaderStyle={
            margin: 0,
        }

        return(

            <Grid container spacing={1}>
                <Paper align='center' style={PaperStyle}>
                    <Grid align='center'>
                        <h2 style={HeaderStyle}>Add Order</h2>
                    </Grid>
                    <form>
                            <Grid container spacing={2} direction={"column"} align="center">

                                    {/*  Customer field */}
                                    <Grid item>
                                        <TextField
                                            id="customer"
                                            label="Customer"
                                            select
                                            onChange={this._handleCustomerChange}
                                            variant="outlined"
                                            value={this.state.customer}
                                            fullWidth
                                            required
                                            multiline
                                            margin="normal"
                                            SelectProps={{
                                                multiple: false,
                                                values : [],
                                            }}
                                        >
                                          {this.state.users.map((user) => (
                                             <MenuItem key={user.first_name} value={user.first_name}>
                                              {user.first_name}
                                            </MenuItem>
                                            ))
                                            }
                                        </TextField>
                                    </Grid>

                                    {/* Product field */}
                                    <Grid item>
                                        <Select
                                            id="product"
                                            input={<OutlinedInput label="Product" />}
                                            select
                                            onChange={this._handleProductChange}
                                            variant="outlined"
                                            value={this.state.product}
                                            renderValue={(selected) => selected.join(', ')}
                                            multiline
                                            sx={{m: 1, width: 300}}
                                            required
                                            multiple
                                        >
                                          {this.state.products.map((product) => (
                                             <MenuItem key={product.id} value={product.name} >
                                                <Checkbox checked={this.state.product.indexOf(product.name) > -1} />
                                                <ListItemText primary={product.name} />
                                              {product.name}
                                            </MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </Grid>
                                    

                                    {/* Status Field*/}
                                    <Grid item> 
                                    <TextField
                                        id="status"
                                        label="Status"
                                        select
                                        onChange={this._handleStatusChange}
                                        variant="outlined"
                                        value={this.state.status}
                                        fullWidth
                                        required
                                        multiline
                                        margin="normal"
                                        SelectProps={{
                                            multiple: false,
                                            values : [],
                                        }}
                                    >
                                        <MenuItem value={"PENDING"} key={"PENDING"} >PENDING</MenuItem>
                                        <MenuItem value={"ACCEPTED"} key={"ACCEPTED"} >ACCEPTED</MenuItem>
                                        <MenuItem value={"REJECTED"} key={"REJECTED"} >REJECTED</MenuItem>
                                    </TextField>
                                    </Grid>

                                    {this._renderCreateButtons()}
                                    
                            </Grid>
                    </form>
                </Paper>
            </Grid>       
        );
    }
}    