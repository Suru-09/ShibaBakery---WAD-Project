import React from "react";
import ProgressBar from "../components/Progress";
import { Paper } from "@mui/material";


const Checkout = () => {

    return (
        <>
        <Paper elevation={12} className="cartpaper">
            <ProgressBar></ProgressBar>
        </Paper>
    </>
    );
}

export default Checkout;