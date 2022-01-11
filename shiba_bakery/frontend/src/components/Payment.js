import React, {useState} from 'react';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem} from '@material-ui/core';
import {
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core';

const Payment= (paymentCallback) => {


  const [creditCardNum, setCreditCardNum] = useState('#### #### #### ####');
  const [cardHolder, setCardHolder] = useState('Your Full Name');
  const [expireMonth, setExpireMonth] = useState("January");
  const [expireYear, setExpireYear] = useState("2022");
  const [cvv, setCVV] = useState("000");
  
  const handleNum = (e) => {
    setCreditCardNum(e.target.rawValue);
  }

  const handleCardHolder = (e) => {
    setCardHolder(e.target.value);
  }

  const handleExpMonth = (e) => {
    setExpireMonth(e.target.value);
  }

  const handleExpYear = (e) => {
    setExpireYear(e.target.value);
  }

  const handleCVV = (e) => {
    setCVV(e.target.value);
  }

  const sendPaymentDetails = () => {
    let payment = []
    if(creditCardNum !== '#### #### #### ####' && typeof creditCardNum !== 'undefined')
        payment.push(creditCardNum);
    if( cardHolder !== 'Your Full Name' && typeof cardHolder !== 'undefined')
        payment.push(cardHolder);
    if( expireMonth !== "January" && typeof expireMonth !== 'undefined')
        payment.push(expireMonth);
    if( expireYear !== "2022" && typeof expireYear !== 'undefined')
        payment.push(expireYear);
    if( cvv !== '000' && typeof expireYear !== 'undefined')
        payment.push(cvv);
    
    if(payment.length === 5)
        paymentCallback(payment);
  }

  const PaperStyle={
    padding: '30px 20px 50px',
    margin: "20px auto",

  }


  return (
    <Paper align='center' elevation={20} style={PaperStyle} sx={{mx: "auto", my: "25px", width: '90%', overflow: 'hidden' }}>
        <Grid container spacing={5} direction={"column"} >
            <Grid item>
                    <img className="logo" src={"../../static/images/creditCard.jpg"}/>
                
            </Grid>

            {/* Card Number */}
            <Grid item>
                <h3>Card Number</h3>
                <TextField
                    id="cardnumber"
                    onChange={handleNum}
                    style = {{width: 500}}
                    label="Enter card number"
                    variant="outlined"
                    required
                    placeholder=""
                    multiline
                    margin="normal"
                />
            </Grid>

            {/* Card Holder */}
            <Grid item>
                <h3>Card Holder</h3>
                <TextField
                    id="cardname"
                    onChange={handleCardHolder}
                    style = {{width: 500}}
                    label="Please enter the name on the card"
                    variant="outlined"
                    required
                    placeholder=""
                    multiline
                    margin="normal"
                />
            </Grid>

            <Grid container  direction={"row"} style={{ display: "flex", justifyContent: "space-evenly" }}>

                  {/*  Expire Month field */}
                  <Grid item style={{ display: "flex", justifyContent: "flex-start" }} >      
                      <TextField
                          id="month"
                          label="Expiration Month"
                          select
                          onChange={handleExpMonth}
                          variant="outlined"
                          style={{minWidth: "175px"}}
                          value={expireMonth}
                          required
                          multiline
                          margin="normal"
                          SelectProps={{
                              multiple: false,
                          }}
                      >
                          <MenuItem value="January">January</MenuItem>
                          <MenuItem value="February">February</MenuItem>
                          <MenuItem value="March">March</MenuItem>
                          <MenuItem value="April">April</MenuItem>
                          <MenuItem value="May">May</MenuItem>
                          <MenuItem value="June">June</MenuItem>
                          <MenuItem value="July">July</MenuItem>
                          <MenuItem value="August">August</MenuItem>
                          <MenuItem value="September">September</MenuItem>
                          <MenuItem value="October">October</MenuItem>
                          <MenuItem value="November">November</MenuItem>
                          <MenuItem value="December">December</MenuItem>
                      </TextField>
                  </Grid>

                <Grid item style={{ display: "flex", justifyContent: "flex-start" }}>
                      <TextField
                      id="year"
                      label="Year"
                      select
                      onChange={handleExpYear}
                      variant="outlined"
                      style={{minWidth: "100px"}}
                      value={expireYear}
                      required
                      multiline
                      margin="normal"
                      SelectProps={{
                          multiple: false,
                          values: [],
                      }}
                  >
                      <MenuItem value="2022">2022</MenuItem>
                      <MenuItem value="2023">2023</MenuItem>
                      <MenuItem value="2024">2024</MenuItem>
                      <MenuItem value="2025">2025</MenuItem>
                      <MenuItem value="2026">2026</MenuItem>
                      <MenuItem value="2027">2027</MenuItem>
                      <MenuItem value="2028">2028</MenuItem>
                      <MenuItem value="2029">2029</MenuItem>
                      <MenuItem value="2030">2030</MenuItem>
                    </TextField>
                </Grid>
                
                 {/* CVV field */}
                <Grid item style={{ display: "flex", justifyContent: "flex-start" }}>
                   
                    <Grid item>
                    <FormControl  fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">CVV</InputLabel>
                    <OutlinedInput
                        id="cvv"
                        onChange={handleCVV}
                        label="CVV"
                        style={{minWidth: "100px"}}
                        type="password"
                    />
                    </FormControl>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Button onClick={() => sendPaymentDetails()}
                >Submit payment</Button>
            </Grid>
        </Grid>
    </Paper>
  );
}

export default Payment;