import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import GetCookie from "../utils/GetCookie";
import {withRouter} from 'react-router-dom';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
           products: [],
        }

        this.getData = this.getData.bind(this);
        this.onChangeAutocomplete = this.onChangeAutocomplete.bind(this);
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

    onChangeAutocomplete(value) {
        this.props.handleCallback(value.id);
        this.props.history.push(`/product/` + value.id);
        window.location = document.URL;
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
            onChange={(e, value) => {
                this.onChangeAutocomplete(value);
            }}
            // onInputChange={(e, value) => {
            //     this.onChangeAutocomplete(value);
            // }}
          />
        );
    }
};

export default withRouter(SearchBar);
