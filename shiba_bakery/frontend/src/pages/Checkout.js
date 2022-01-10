import React from "react";
import ProgressBar from "../components/Progress";
import { Paper } from "@mui/material";
import { withRouter } from "react-router-dom";

const Checkout = () => {

    return (
        <>
            <Paper elevation={12} className="cartpaper">
                <ProgressBar></ProgressBar>
            </Paper>
        </>
    );
}

export default withRouter(Checkout);