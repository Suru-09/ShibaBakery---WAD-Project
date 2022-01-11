import React from "react";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";

const Finish = (status) => {

    const PaperStyle={
        padding: '30px 20px 50px',
        margin: "20px auto",

    }

    const renderSent = () => {
        return(
            <div>
                    <h2>Your order was sent</h2>
                    <h1>Thank you!</h1>
            </div>
        );
    }

    const renderPending = () => {
        return(
            <div>
                    <h2>Press the submit button</h2>
                    <h1>Thank you!</h1>
            </div>
        );
    }

    return (
        <Paper align='center' elevation={20} style={PaperStyle} sx={{mx: "auto", my: "25px", width: '90%', overflow: 'hidden' }}>
            
            
                <Grid elevation={8} container spacing={5} direction={"column"}>

                    <Grid Item>
                        {status || typeof status === 'undefined' ? renderSent() : renderPending()}
                    </Grid>

                </Grid>
    
    
        </Paper>
    );
}

export default Finish;