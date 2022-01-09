import React from "react";
import { Button, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";

const OrderDet = () => {

    const PaperStyle={
        padding: '30px 20px 50px',
        margin: "20px auto",

    }

    let ok=false;

    return (
        <Paper align='center' elevation={20} style={PaperStyle} sx={{mx: "auto", my: "25px", width: '90%', overflow: 'hidden' }}>
            
            
                <Grid elevation={8} container spacing={5} direction={"column"}>

                    <Grid item> 
                        <Button 
                            color="primary"
                            variant="contained">Delivery</Button>

                        <Button 
                            color="primary"
                            variant="contained">Personal Pick-Up</Button>
                    </Grid>

                    {/* Contact Person */}
                    <Grid item > 
                        <TextField
                            id="contactperson"
                            label="Contact Person"
                            // onChange={this._handleUsernameTextFieldChange}
                            variant="outlined"
                            fullWidth
                            required
                            placeholder=""
                            multiline
                            margin="normal"
                        />
                    </Grid>

                    {/* Phone Number */}
                    <Grid item> 
                        <TextField
                            id="phonenumber"
                            label="Phone Number"
                            // onChange={this._handleUsernameTextFieldChange}
                            variant="outlined"
                            fullWidth
                            required
                            placeholder=""
                            multiline
                            margin="normal"
                        />
                    </Grid>

                    {/* Delivery Address */}
                    <Grid item> 
                        <TextField
                            id="deliveryaddress"
                            label="Delivery Address"
                            // onChange={this._handleUsernameTextFieldChange}
                            variant="outlined"
                            fullWidth
                            required
                            placeholder=""
                            multiline
                            margin="normal"
                        />
                    </Grid>
                </Grid>
    
    
        </Paper>
    );
}

export default OrderDet;