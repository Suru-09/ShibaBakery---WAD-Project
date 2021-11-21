import React, { Component } from 'react';
import {
    Grid,
    OutlinedInput,
    Paper,
    TextField,
    Typography,
    InputLabel,
    FormControl,
    Button,
    IconButton,
    InputAdornment,
} from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {NavLink, withRouter} from 'react-router-dom';
import GetCookie from "../utils/GetCookie";
import GetUserAfterUsername from "../utils/GetUserAfterUsername";

class LoginPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            usernameUser: "",
            passwordUser: "",
            showPassword: false,
            userID: -1,
        }
        this._handleUsernameTextFieldChange = this._handleUsernameTextFieldChange.bind(this);
        this._handlePasswordTextFieldChange = this._handlePasswordTextFieldChange.bind(this);
        this._renderCreateButtons = this._renderCreateButtons.bind(this);
        this._LoginButtonPressed = this._LoginButtonPressed.bind(this);
        this._handleClickShowPassword = this._handleClickShowPassword.bind(this);

    }

    async _LoginButtonPressed(e) {
        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": GetCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                username: this.state.usernameUser,
                password: this.state.passwordUser,
            }),
        };

        await fetch('api/login', requestOptions).then(async (response) => {
            if (response.ok) {
                console.log("M-am logat!");
                const is_admin = await response.json();
                if(is_admin) {
                    this.props.history.push('/adminPage');
                }
                else {
                   this.props.history.push('/home');
                }
                this.props.loginCallback(this.state.usernameUser);
                window.location.reload();
            } else {
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
            
                <Grid item align="center">
                    <Button color="primary"
                            variant="contained"
                            onClick={this._LoginButtonPressed}
                            
                            >
                        Login
                    </Button>
                </Grid>
           
        );
    }

    _handleClickShowPassword(e){
        this.setState({
            showPassword: !this.state.showPassword
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
                <Paper align='center' elevation={20} style={PaperStyle}>
                    <Grid align='center'>
                        <h2 style={HeaderStyle}>Login</h2>
                        <Typography variant='caption'>Please enter your credentials</Typography>
                    </Grid>

                    
                    <form>

                        <Grid container spacing={2} direction={"column"} align="center">

                                {/* Username field */}
                                <Grid item> 
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
                                    />
                                </Grid>
                                
                                {/* Password field */}
                                <Grid item>
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
                                                {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"

                                />
                                </FormControl>
                                </Grid>

                                {this._renderCreateButtons()}

                                <Grid item>
                                    <NavLink to="/sign-up" margin="normal">Don't have an account? Sign-up</NavLink>
                                </Grid>
                        </Grid>
                    </form>
                </Paper>

            </Grid>       
        );

    }
}

export default withRouter(LoginPage);
