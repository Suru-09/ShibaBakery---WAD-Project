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


export default class LoginPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            usernameUser: "",
            passwordUser: "",
        }
        this._handleUsernameTextFieldChange = this._handleUsernameTextFieldChange.bind(this);
        this._handlePasswordTextFieldChange = this._handlePasswordTextFieldChange.bind(this);
        this._renderCreateButtons = this._renderCreateButtons.bind(this);
        this._LoginButtonPressed = this._LoginButtonPressed.bind(this);
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

    _LoginButtonPressed(e) {
        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": this.getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                username: this.state.usernameUser,
                password: this.state.passwordUser,
            }),
        };
        
        fetch('api/login', requestOptions).then((response) => {
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

    _renderCreateButtons() {
        return(
            <Grid container spacing={1} align="center">
                <Grid item align="center">
                    <Button color="primary"
                            variant="contained"
                            onClick={this._LoginButtonPressed}>
                        Login
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
                        <h2 style={HeaderStyle}>Login</h2>
                        <Typography variant='caption'>Please enter your credentials</Typography>
                    </Grid>

                    
                    <form>

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

                        {this._renderCreateButtons()}

                    </form>
                </Paper>

                
            </Grid>       
        );

    }

}



