import React, {useState} from 'react';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';

const Payment= () => {
  const [creditCardNum, setCreditCardNum] = useState('#### #### #### ####');
  const [cardHolder, setCardHolder] = useState('Your Full Name');
  const [expireMonth, setExpireMonth] = useState('');
  const [expireYear, setExpireYear] = useState('');
  
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
                <Grid item style={{ display: "flex", justifyContent: "flex-start" }}>
                    <h3>Expiration Year</h3>
                    <Select value={expireYear} onChange={handleExpYear}>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </Select>
                </Grid>
                <Grid item style={{ display: "flex", justifyContent: "flex-start" }}>
                <h3>Month</h3>
                <Select value={expireMonth} onChange={handleExpMonth} style={{fontSize: "14"}}>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </Select>
                </Grid>
                <Grid item style={{ display: "flex", justifyContent: "flex-start" }}>
                    <h3>CVV</h3>
                    <input type="password" placeholder="CVV" required/>
                </Grid>
            </Grid>

            <Grid item>
                <Button>Submit payment</Button>
            </Grid>
        </Grid>
    </Paper>
  );
}

export default Payment;