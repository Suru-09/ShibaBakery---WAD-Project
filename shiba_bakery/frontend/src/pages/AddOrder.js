import React, { Component} from 'react';
import { 
    Grid,
    Paper,
    TextField,
    Button,
    
} from '@material-ui/core';


//const errorsDefault = {};

export default class AddOrder extends Component{

    constructor(props) {
        super(props);
        this.state = {
            date_created: '',
            customer: '',
            product: '',
            status: ''
        }
        // this._handleNameTextFieldChange = this._handleNameTextFieldChange.bind(this);
        // this._handleSurnameTextFieldChange = this._handleSurnameTextFieldChange.bind(this);
        // this._handleUsernameTextFieldChange = this._handleUsernameTextFieldChange.bind(this);
        // this._handlePasswordTextFieldChange = this._handlePasswordTextFieldChange.bind(this);
        // this._handleConfirmTextFieldChange = this._handleConfirmTextFieldChange.bind(this);
        // this._handleEmailTextFieldChange = this._handleEmailTextFieldChange.bind(this);
        this._renderCreateButtons = this._renderCreateButtons.bind(this);
        // this._signUpButtonPressed = this._signUpButtonPressed.bind(this);
        // this._handleClickShowPassword = this._handleClickShowPassword.bind(this);
        // this._handleCheckBoxFieldChange = this._handleCheckBoxFieldChange.bind(this);
        // this._setError = this._setError.bind(this);
    }


    // _setError(e){
    //     this.setState({
    //         errors: e
    //     });
    // }

    // _signUpButtonPressed(e) {
       
    //     const invalid = signUpValidation(this.state);
    //     console.log(Object.keys(invalid).length);
    //     console.log(Object.getPrototypeOf(invalid) === Object.prototype);

    //     if( Object.keys(invalid).length === 0 && 
    //         Object.getPrototypeOf(invalid) === Object.prototype){
                
    //             const requestOptions = {
    //                 method: "POST",
    //                 headers: {
    //                 "X-CSRFToken": GetCookie("csrftoken"),
    //                 "Accept": "application/json",
    //                 'Content-Type': 'application/json'
    //             },
    //                 body: JSON.stringify({
    //                     last_name: this.state.nameUser,
    //                     first_name: this.state.surnameUser,
    //                     username: this.state.usernameUser,
    //                     password: this.state.passwordUser,
    //                     email: this.state.emailUser,
    //                 }),
    //             };
                
    //             fetch('/api/sign-up', requestOptions).then((response) => {
    //                 if(response.ok) {
    //                     console.log("Am reusit");
    //                     this.props.history.push('/home');
    //                 }
    //                 else {
    //                     console.log("Am esuat rau de tot!");
    //                 }
    //             }).catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    //     else {
    //         console.log("Eu sunt: ");
    //         console.log(invalid);
    //         this._setError(invalid);    
    //     }
    // } 

    // _handleNameTextFieldChange(e) {
    //     this.setState({
    //         nameUser: e.target.value
    //     });
    // }

    // _handleSurnameTextFieldChange(e) {
    //     this.setState({
    //         surnameUser: e.target.value
    //     });
    // }

    // _handleUsernameTextFieldChange(e) {
    //     this.setState({
    //         usernameUser: e.target.value
    //     });
    // }

    // _handlePasswordTextFieldChange(e) {
    //     this.setState({
    //         passwordUser: e.target.value
    //     });
    // }

    // _handleConfirmTextFieldChange(e) {
    //     this.setState({
    //         confirmUser: e.target.value
    //     });
    // }

    // _handleEmailTextFieldChange(e) {
    //     this.setState({
    //         emailUser: e.target.value
    //     });
    // }

    _renderCreateButtons() {
        return(
            
                <Grid item align="center" >
                    <Button color="primary"
                            variant="contained"
                            
                            // onClick={this._signUpButtonPressed}
                            >
                        Add
                    </Button>
                </Grid>
           
        );
    }

    // _handleClickShowPassword(e){
    //     this.setState({
    //         showPassword: !this.state.showPassword
    //     });
    // }

    // _handleCheckBoxFieldChange(e){
    //     this.setState({
    //         checked: !this.state.checked
    //     });
    // }

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

                                    {/* Name field */}
                                    <Grid item>
                                        <TextField
                                            id="date_created"
                                            // onChange={this._handleNameTextFieldChange}
                                            fullWidth
                                            label="Date created"
                                            variant="outlined"
                                            required
                                            placeholder=""
                                            multiline
                                            margin="normal"
                                        />
                                        {/* {console.log(this.state.errors.nameUser)}
                                        {this.state.errors.nameUser && <p>{this.state.errors.nameUser}</p>} */}
                                    </Grid>
                                    
                                    {/* Surame field */}
                                    <Grid item> 
                                        <TextField
                                            id="customer"
                                            // onChange={this._handleSurnameTextFieldChange}
                                            fullWidth
                                            label="Customer"
                                            variant="outlined"
                                            required
                                            placeholder=""
                                            multiline
                                            margin="normal"
                                        />
                                        {/* {this.state.errors.surnameUser && <p>{this.state.errors.surnameUser}</p>} */}
                                    </Grid>

                                    {/* Username field */}
                                    <Grid item> 
                                        <TextField
                                            id="product"
                                            label="Product"
                                            // onChange={this._handleUsernameTextFieldChange}
                                            variant="outlined"
                                            fullWidth
                                            required
                                            placeholder=""
                                            multiline
                                            margin="normal"
                                        />
                                        {/* {this.state.errors.usernameUser && <p>{this.state.errors.usernameUser}</p>} */}
                                    </Grid>
                                    

                                    {/* Email Field*/}
                                    <Grid item> 
                                    <TextField
                                        id="status"
                                        label="Status"
                                        // onChange={this._handleEmailTextFieldChange}
                                        variant="outlined"
                                        fullWidth
                                        required
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



