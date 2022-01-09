import React, { Component} from 'react';
import { 
    Grid,
    Paper,
    TextField,
    Button,
    
} from '@material-ui/core';
import signUpValidation from "./SignUpValidation";
import GetCookie from "../utils/GetCookie";


//const errorsDefault = {};

export default class AddUser extends Component{

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '' ,
            password: '',
            username: '',
            email: '',
            errors: '',
        }
        this._handleNameTextFieldChange = this._handleNameTextFieldChange.bind(this);
        this._handleSurnameTextFieldChange = this._handleSurnameTextFieldChange.bind(this);
        this._handleUsernameTextFieldChange = this._handleUsernameTextFieldChange.bind(this);
        this._handlePasswordTextFieldChange = this._handlePasswordTextFieldChange.bind(this);
        this._handleEmailTextFieldChange = this._handleEmailTextFieldChange.bind(this);
        this._renderCreateButtons = this._renderCreateButtons.bind(this);
        this._addUser = this._addUser.bind(this);
        this._setError = this._setError.bind(this);
    }


    _setError(e){
        this.setState({
            errors: e
        });
    }

    _addUser(e) {
        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": GetCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                last_name: this.state.last_name,
                first_name: this.state.first_name,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
            }),
        };

        fetch('/api/sign-up', requestOptions).then((response) => {
            if(response.ok) {
                console.log("Am reusit");
                this.props.history.push('/adminPage/UserTable');
            }
            else {
                console.log("Am esuat rau de tot!");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    _handleNameTextFieldChange(e) {
        this.setState({
            first_name: e.target.value
        });
    }

    _handleSurnameTextFieldChange(e) {
        this.setState({
            last_name: e.target.value
        });
    }

    _handleUsernameTextFieldChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    _handlePasswordTextFieldChange(e) {
        this.setState({
            password: e.target.value
        });
    }


    _handleEmailTextFieldChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    _renderCreateButtons() {
        return(
            
                <Grid item align="center" >
                    <Button color="primary"
                            variant="contained"
                            onClick={this._addUser}
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
                        <h2 style={HeaderStyle}>Add User</h2>
                    </Grid>
                    <form>
                            <Grid container spacing={2} direction={"column"} align="center">
                                    {/* Surame field */}
                                    <Grid item> 
                                        <TextField
                                            id="first_name"
                                            onChange={this._handleSurnameTextFieldChange}
                                            fullWidth
                                            label="First Name"
                                            variant="outlined"
                                            required
                                            placeholder=""
                                            multiline
                                            margin="normal"
                                        />
                                         {this.state.errors.surnameUser && <p>{this.state.errors.surnameUser}</p>}
                                    </Grid>

                                    {/* Name field */}
                                    <Grid item> 
                                        <TextField
                                            id="last_name"
                                            label="Last Name"
                                            onChange={this._handleNameTextFieldChange}
                                            variant="outlined"
                                            fullWidth
                                            required
                                            placeholder=""
                                            multiline
                                            margin="normal"
                                        />
                                         {this.state.errors.nameUser && <p>{this.state.errors.nameUser}</p>}
                                    </Grid>
                                    

                                    {/* Password Field*/}
                                    <Grid item> 
                                    <TextField
                                        id="password"
                                        label="Password"
                                        onChange={this._handlePasswordTextFieldChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        placeholder=""
                                        multiline
                                        margin="normal"
                                    />
                                         {this.state.errors.passwordUser && <p>{this.state.errors.passwordUser}</p>}
                                    </Grid>

                                    {/* Username Field*/}
                                    <Grid item> 
                                    <TextField
                                        id="username"
                                        label="Username"
                                        onChange={this._handleUsernameTextFieldChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        placeholder=""
                                        multiline
                                        margin="normal"
                                    />
                                         {this.state.errors.usernameUser && <p>{this.state.errors.usernameUser}</p>}
                                    </Grid>

                                    {/* Email Field*/}
                                    <Grid item> 
                                    <TextField
                                        id="email"
                                        label="Email"
                                        onChange={this._handleEmailTextFieldChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        placeholder=""
                                        multiline
                                        margin="normal"
                                    />
                                         {this.state.errors.emailUser && <p>{this.state.errors.emailUser}</p>}
                                    </Grid>

                                    {this._renderCreateButtons()}
                                    
                            </Grid>
                    </form>
                </Paper>
            </Grid>       
        );
    }
}