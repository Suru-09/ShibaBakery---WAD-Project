import React, { Component } from 'react';
import {Avatar, Grid, OutlinedInput, Paper, rgbToHex, TextField, Typography} from '@material-ui/core';
import { render, Link } from "react-dom";
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';







export default class SignUp extends Component{

    constructor(props) {
        super(props);
        
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
       
        
        <Grid >
            <Paper align='center' elevation={20} style={PaperStyle}>
                <Grid align='center'>
                    <Avatar>

                    </Avatar>
                    <h2 style={HeaderStyle}>Sign Up</h2>
                    <Typography variant='caption'>Pleasefill in this form to create an account</Typography>
                </Grid>

                
                 <form>

                     {/* Name field */}
                    <Grid> 
                    <TextField 
                        id="namefild" 
                        fullWidth 
                        label="Name"
                        variant="outlined"
                        required
                        placeholder=""
                        multiline
                        margin="normal"
                    ></TextField></Grid>
                    
                     {/* Surame field */}
                    <Grid> 
                    <TextField 
                        id="surnamefild" 
                        fullWidth
                        label="Surname"
                        variant="outlined"
                        required
                        placeholder=""
                        multiline
                        margin="normal"
                    ></TextField></Grid>

                     {/* Username field */}
                     <Grid> 
                     <TextField
                        id="usernamefild"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        placeholder=""
                        multiline
                        margin="normal"
                    ></TextField></Grid>
                    

                     {/* Password field */}
                    <Grid>
                        <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel htmlFor="passwordfild">Password</InputLabel>
                        <OutlinedInput
                            id="passwordfild"
                            
                        >
                           
                        </OutlinedInput>
                        </FormControl>

                    </Grid>


                    {/* Select field */}
                    <Grid>
                    <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="demo-simple-select-label">Select_something</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="select"
                    label="Select something"
                     >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>User</MenuItem>
                    </Select>
                     </FormControl>
                     </Grid>
                   







                 </form>
                
                
            </Paper>

        </Grid>
        
        
    );

    }

}



