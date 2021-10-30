import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
           products: [],
        }

        this.getData = this.getData.bind(this);
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    async getData() {
        const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": this.getCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };


        const response = await fetch('api/get-product', requestOptions);
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
