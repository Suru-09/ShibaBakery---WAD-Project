import React, { Component, useState, SetStateAction} from 'react';
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
    Button,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { render, Link } from "react-dom";
import signUpValidation from './SignUpValidation';


const errorsDefault = ["","","","","",""]


export default class SignUpPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            nameUser: "",
            surnameUser: "",
            usernameUser: "",
            passwordUser: "",
            confirmUser: "",
            emailUser: "",
            showPassword: false,
            checked: false,
            errors: errorsDefault,
        }
        this._handleNameTextFieldChange = this._handleNameTextFieldChange.bind(this);
        this._handleSurnameTextFieldChange = this._handleSurnameTextFieldChange.bind(this);
        this._handleUsernameTextFieldChange = this._handleUsernameTextFieldChange.bind(this);
        this._handlePasswordTextFieldChange = this._handlePasswordTextFieldChange.bind(this);
        this._handleConfirmTextFieldChange = this._handleConfirmTextFieldChange.bind(this);
        this._handleEmailTextFieldChange = this._handleEmailTextFieldChange.bind(this);
        this._renderCreateButtons = this._renderCreateButtons.bind(this);
        this._signUpButtonPressed = this._signUpButtonPressed.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this._handleClickShowPassword = this._handleClickShowPassword.bind(this);
        this._handleCheckBoxFieldChange = this._handleCheckBoxFieldChange.bind(this);
        this._setError = this._setError.bind(this);
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

    _setError(e){
        this.setState({
            errors: e
        });
    }

    // _renderError(e){

    //     return(

            

    //     );
    //     // switch(e.target.value){
    //     //     case
    //     // }
    // }

    _signUpButtonPressed(e) {
       
       
        const invalid = signUpValidation(this);
        if(invalid){
            this._setError(invalid);
        }
        else {

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

    _handleConfirmTextFieldChange(e) {
        this.setState({
            confirmUser: e.target.value
        });
    }

    _handleEmailTextFieldChange(e) {
        this.setState({
            emailUser: e.target.value
        });
    }

    _renderCreateButtons() {
        return(
            <Grid container spacing={1} align="center" >
                <Grid item align="center" >
                    <Button color="primary"
                            variant="contained"
                            
                            onClick={this._signUpButtonPressed}>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        );
    }

    _handleClickShowPassword(e){
        this.setState({
            showPassword: !e.showPassword
        });
    }

    _handleCheckBoxFieldChange(e){
        this.setState({
            checked: !e.checked
        });
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
                <Paper align='center' elevation={25} style={PaperStyle}>
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
                            {this.state.errors.nameUser && <p>{this.state.errors.nameUser}</p>}
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
                        <FormControl  fullWidth margin="normal" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                                id="passwordField"
                                type={this.state.showPassword ? 'text' : 'password'}
                                
                                 onChange={this._handlePasswordTextFieldChange}
                                 endAdornment={
                                     <InputAdornment position="end">
                                      <IconButton
                                      onClick={this._handleClickShowPassword}
                                      edge="end"
                                      >
                                     {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                     </InputAdornment>
                                  }
                                 label="Password"
                                
                         ></OutlinedInput>
                         </FormControl>
                        </Grid>

                        {/* Confirm Field */}
                        <Grid>
                        <FormControl  fullWidth margin="normal" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                        <OutlinedInput
                                id="confirmField"
                                type={this.state.showPassword ? 'text' : 'password'}
                                
                                onChange={this._handleConfirmTextFieldChange}
                                 endAdornment={
                                     <InputAdornment position="end">
                                      <IconButton
                                      onClick={this._handleClickShowPassword}
                                      edge="end"
                                      >
                                     {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                     </InputAdornment>
                                  }
                                  label="Confirm password"
                                
                         ></OutlinedInput>
                         </FormControl>
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

                        <Grid>
                        <FormControlLabel
                            control={
                            <Checkbox  checked={this.state.checked} onChange={this._handleCheckBoxFieldChange} name="check" color="primary" />
                            }
                            
                            labelPlacement="end"
                            label="Agree with terms and conditions"
                            
                        />
                        </Grid>

                        {this._renderCreateButtons()}

                    </form>
                </Paper>

                
            </Grid>       
        );

    }

}



