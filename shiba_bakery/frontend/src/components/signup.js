import React, { Component } from 'react';
import { Avatar,
    Grid,
    OutlinedInput,
    Paper,
    rgbToHex,
    TextField,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button
} from '@material-ui/core';

import { render, Link } from "react-dom";


export default class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            nameUser: "",
            surnameUser: "",
            usernameUser: "",
            passwordUser: "",
            addressUser: "",
            emailUser: "",
        }
        this._handleNameTextFieldChange = this._handleNameTextFieldChange.bind(this);
        this._handleSurnameTextFieldChange = this._handleSurnameTextFieldChange.bind(this);
        this._handleUsernameTextFieldChange = this._handleUsernameTextFieldChange.bind(this);
        this._handlePasswordTextFieldChange = this._handlePasswordTextFieldChange.bind(this);
        this._handleAddressTextFieldChange = this._handleAddressTextFieldChange.bind(this);
        this._handleEmailTextFieldChange = this._handleEmailTextFieldChange.bind(this);
        this._renderCreateButtons = this._renderCreateButtons.bind(this);
        this._signUpButtonPressed = this._signUpButtonPressed.bind(this);
        this.getCookie = this.getCookie.bind(this);

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

    _signUpButtonPressed(e) {
        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": this.getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                last_name: this.state.nameUser,
                first_name: this.state.surnameUser,
                username: this.state.usernameUser,
                password: this.state.passwordUser,
                address: this.state.addressUser,
                email: this.state.emailUser,
            }),
        };
        
        fetch('/api/sign-up', requestOptions).then((response) => {
            if(response.ok) {
                console.log("Am reusit");
                this.props.history.push('/home');
            }
            else {
                console.log("Am esuat rau de tot!");
            }
        }).catch((error) => {
            console.log(error);
        })
    } 

    _handleNameTextFieldChange(e) {
        this.setState({
            nameUser: e.target.value
        });
    }

    _handleSurnameTextFieldChange(e) {
        this.setState({
            surnameUser: e.target.value
        });
    }

    _handleUsernameTextFieldChange(e) {
        this.setState({
            usernameUser: e.target.value
        });
    }

    _handlePasswordTextFieldChange(e) {
        this.setState({
            passwordUser: e.target.value
        });
    }

    _handleAddressTextFieldChange(e) {
        this.setState({
            addressUser: e.target.value
        });
    }

    _handleEmailTextFieldChange(e) {
        this.setState({
            emailUser: e.target.value
        });
    }

    _renderCreateButtons() {
        return(
            <Grid container spacing={1} align="center">
                <Grid item align="center">
                    <Button color="primary"
                            variant="contained"
                            onClick={this._signUpButtonPressed}>
                        Sign Up
                    </Button>
                </Grid>
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
                <Paper align='center' elevation={20} style={PaperStyle}>
                    <Grid align='center'>
                        <Avatar></Avatar>
                        <h2 style={HeaderStyle}>Sign Up</h2>
                        <Typography variant='caption'>Pleasefill in this form to create an account</Typography>
                    </Grid>

                    
                    <form>

                        {/* Name field */}
                        <Grid> 
                            <TextField 
                                id="namefild" 
                                onChange={this._handleNameTextFieldChange}
                                fullWidth 
                                label="Name"
                                variant="outlined"
                                required
                                placeholder=""
                                multiline
                                margin="normal"
                            ></TextField>
                        </Grid>
                        
                        {/* Surame field */}
                        <Grid> 
                            <TextField 
                                id="surnamefild" 
                                onChange={this._handleSurnameTextFieldChange}
                                fullWidth
                                label="Surname"
                                variant="outlined"
                                required
                                placeholder=""
                                multiline
                                margin="normal"
                            ></TextField>
                        </Grid>

                        {/* Username field */}
                        <Grid> 
                            <TextField
                                id="usernamefild"
                                label="Username"
                                onChange={this._handleUsernameTextFieldChange}
                                variant="outlined"
                                fullWidth
                                required
                                placeholder=""
                                multiline
                                margin="normal"
                            ></TextField>
                        </Grid>
                        
                        {/* Password field */}
                        <Grid> 
                            <TextField
                                margin="normal"
                                fullWidth
                                required
                                placeholder=""
                                multiline
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                onChange={this._handlePasswordTextFieldChange}
                            />
                        </Grid>

                        {/* Address Field */}
                        <Grid> 
                        <TextField
                                id="addressField"
                                label="Address"
                                onChange={this._handleAddressTextFieldChange}
                                variant="outlined"
                                fullWidth
                                required
                                placeholder=""
                                multiline
                                margin="normal"
                            ></TextField>
                        </Grid>

                        {/* Email Field*/}
                        <Grid> 
                        <TextField
                                id="emailField"
                                label="E-mail"
                                onChange={this._handleEmailTextFieldChange}
                                variant="outlined"
                                fullWidth
                                required
                                placeholder=""
                                multiline
                                margin="normal"
                            ></TextField>
                        </Grid>

                        {this._renderCreateButtons()}

                    </form>
                </Paper>

                
            </Grid>       
        );

    }

}



