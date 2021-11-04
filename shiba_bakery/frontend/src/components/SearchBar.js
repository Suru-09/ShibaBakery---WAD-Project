import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import GetCookie from "../utils/GetCookie";

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
           products: [],
        }

        this.getData = this.getData.bind(this);
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

    componentDidMount() {
        this.getData();
    }

    render() {

        const options = this.state.products.map((option) => {
            return option;
        });

        return (
           <Autocomplete
            id="grouped-demo"
            options={options.sort((a, b) => -b.category.localeCompare(a.category))}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" size="normal" />}
          />
        );
    }
};
