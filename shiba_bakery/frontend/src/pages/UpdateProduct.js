import React, { Component} from 'react';
import { 
    Grid,
    Paper,
    TextField,
    Button,
    
} from '@material-ui/core';
import {Input} from "@mui/material";
import GetCookie from "../utils/GetCookie";


//const errorsDefault = {};

export default class UpdateProduct extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.product.name,
            ingredients: this.props.product.ingredients,
            price: this.props.product.price ,
            category: this.props.product.category,
            description: this.props.product.description,
            image: this.props.product.image,
            stock_count: this.props.product.stock_count
        }
        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleIngredientsChange = this._handleIngredientsChange.bind(this);
        this._handlePriceChange = this._handlePriceChange.bind(this);
        this._handleCategoryChange = this._handleCategoryChange.bind(this);
        this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleStockCountChange = this._handleStockCountChange.bind(this);
        this._renderCreateButtons = this._renderCreateButtons.bind(this);
        this._updateProductButtonPressed = this._updateProductButtonPressed.bind(this);
    }

    _updateProductButtonPressed(e) {

        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": GetCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                name: this.state.name,
                ingredients: this.state.ingredients,
                price: this.state.price,
                category: this.state.category,
                description: this.state.description,
                image: this.state.image,
                stock_count: this.state.stock_count
            }),
        };

        fetch('/api/update-product', requestOptions).then((response) => {
            if(response.ok) {
                console.log("Am reusit");
                this.props.history.push('/adminPage/ProductTable');
            }
            else {
                console.log("Am esuat rau de tot!");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

 _handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

_handleIngredientsChange(e) {
    this.setState({
        ingredients: e.target.value
    });
}

_handlePriceChange(e) {
    this.setState({
        price: e.target.value
    });
}

_handleCategoryChange(e) {
    this.setState({
        category: e.target.value
    });
}

_handleDescriptionChange(e) {
    this.setState({
       description: e.target.value
    });
}

_handleImageChange(e) {
    let index = e.target.value.lastIndexOf("\\");
    const path = "\\images\\" + e.target.value.substr(index + 1);
    this.setState({
        image: path
    })
}

_handleStockCountChange(e) {
    this.setState({
        stock_count: e.target.value
    })
}

_renderCreateButtons() {
    return(

            <Grid item align="center" >
                <Button color="primary"
                        variant="contained"
                        onClick={this._updateProductButtonPressed}
                        >
                    Update
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
                    <h2 style={HeaderStyle}>Update Product</h2>
                </Grid>
                <form>
                        <Grid container spacing={2} direction={"column"} align="center">

                                {/* Name field */}
                                <Grid item>
                                    <TextField
                                        id="namefild"
                                        value={this.state.name}
                                        onChange={this._handleNameChange}
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        required
                                        // defaultValue={this.props.product.name}
                                        placeholder=""
                                        multiline
                                        margin="normal"
                                    />
                                    {/* {console.log(this.state.errors.nameUser)}
                                    {this.state.errors.nameUser && <p>{this.state.errors.nameUser}</p>} */}
                                </Grid>

                                {/* Ingredients field */}
                                <Grid item>
                                    <TextField
                                        id="ingredients"
                                        onChange={this._handleIngredientsChange}
                                        fullWidth
                                        label="Ingredients"
                                        variant="outlined"
                                        required
                                        defaultValue={this.props.product.ingredients}
                                        placeholder=""
                                        multiline
                                        margin="normal"
                                    />
                                    {/* {this.state.errors.surnameUser && <p>{this.state.errors.surnameUser}</p>} */}
                                </Grid>

                                {/* Price field */}
                                <Grid item>
                                    <TextField
                                        id="price"
                                        label="Price"
                                        onChange={this._handlePriceChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        defaultValue={this.props.product.price}
                                        placeholder=""
                                        multiline
                                        margin="normal"
                                    />
                                    {/* {this.state.errors.usernameUser && <p>{this.state.errors.usernameUser}</p>} */}
                                </Grid>


                                {/*  Category Field*/}
                                <Grid item>
                                <TextField
                                    id="category"
                                    label="Category"
                                    onChange={this._handleCategoryChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    defaultValue={this.props.product.category}
                                    placeholder=""
                                    multiline
                                    margin="normal"
                                />
                                    {/* {this.state.errors.emailUser && <p>{this.state.errors.emailUser}</p>} */}
                                </Grid>

                                {/* Description Field*/}
                                <Grid item>
                                <TextField
                                    id="description"
                                    label="Description"
                                    onChange={this._handleDescriptionChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    defaultValue={this.props.product.description}
                                    placeholder=""
                                    multiline
                                    margin="normal"
                                />
                                    {/* {this.state.errors.emailUser && <p>{this.state.errors.emailUser}</p>} */}
                                </Grid>

                                {/* Image Field*/}
                                <Grid item>
                                    <Input
                                        type="file"
                                        label="Image"
                                        onChange={this._handleImageChange}
                                        variant="outlined"
                                        required
                                    />
                                    {/* {this.state.errors.emailUser && <p>{this.state.errors.emailUser}</p>} */}
                                </Grid>

                                {/* Stock count Field*/}
                                <Grid item>
                                <TextField
                                    id="stock_count"
                                    label="stock_count"
                                    onChange={this._handleStockCountChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    defaultValue={this.props.product.stock_count}
                                    placeholder=""
                                    multiline
                                    margin="normal"
                                />
                                    {/* {this.state.errors.emailUser && <p>{this.state.errors.emailUser}</p>} */}
                                </Grid>

                                {this._renderCreateButtons()}

                        </Grid>
                </form>
            </Paper>
        </Grid>
        );
    }
}