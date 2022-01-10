import React from "react";
import { Button, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const OrderDet = ( {orderDetailsCallback} ) => {

    const PaperStyle={
        padding: '30px 20px 50px',
        margin: "20px auto",

    }

    const [contactPerson, setContactPerson] = useState('');
    const contactPersonChange = (e) => {
        setContactPerson(e.target.value);
        _handleCallback();
    }

    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        _handleCallback();
    }

    const [deliveryAddress, setDeliveryAddress] = useState('');
    const deliveryAddressChange = (e) => {
        setDeliveryAddress(e.target.value);
        _handleCallback();
    }

    const _handleCallback = () => {
        var orderDetails = []
        if(contactPerson !== '')
            orderDetails.push(contactPerson);
        if(phoneNumber !== '')
            orderDetails.push(phoneNumber);
        if(deliveryAddress != '')    
            orderDetails.push(deliveryAddress);
        if(orderDetails.length === 3)
            orderDetailsCallback(orderDetails);
    }


    return (
        <Paper align='center' elevation={20} style={PaperStyle} sx={{mx: "auto", my: "25px", width: '90%', overflow: 'hidden' }}>
            
            
                <Grid elevation={8} container spacing={5} direction={"column"}>

                    <Grid item>
                        <h2>Order details</h2>
                    </Grid>

                    {/* Contact Person */}
                    <Grid item > 
                        <TextField
                            id="contactperson"
                            label="Contact Person"
                            onChange={contactPersonChange}
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
                            onChange={phoneNumberChange}
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
                            onChange={deliveryAddressChange}
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