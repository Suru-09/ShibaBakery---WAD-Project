import React from "react";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";

const Finish = () => {

    const PaperStyle={
        padding: '30px 20px 50px',
        margin: "20px auto",

    }

    return (
        <Paper align='center' elevation={20} style={PaperStyle} sx={{mx: "auto", my: "25px", width: '90%', overflow: 'hidden' }}>
            
            
                <Grid elevation={8} container spacing={5} direction={"column"}>

                    <Grid Item>
                        <h2>Your order was sent</h2>
                        <h1>Thank you!</h1>
                    </Grid>

                </Grid>
    
    
        </Paper>
    );
}

export default Finish;