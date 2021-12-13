import React, { Component} from 'react';
import { 
    Grid,
    Paper,
    TextField,
    Button,
    
} from '@material-ui/core';



export default class HandleOrder extends Component{

    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }
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

            <Grid container spacing={1}>
                <Paper align='center' style={PaperStyle}>
                    <Grid align='center'>
                        <h2 style={HeaderStyle}>Handle Order</h2>
                    </Grid>
                    <form>
                            <Grid container spacing={2} direction={"column"} align="center">

                                    {/* Name field */}
                                    <Grid item>
                                        <Button variant="contained" size="small">
                                            Accept
                                        </Button>
                                     </Grid>
                                    
                                    {/* Surame field */}
                                    <Grid item>
                                        <Button variant="contained" size="small">
                                            Decline
                                        </Button>
                                     </Grid>

                                    {/* Username field */}
                                    <Grid item>
                                        <Button variant="contained" size="small">
                                            Delivered
                                        </Button>
                                     </Grid>
                                    

                                    {/* Email Field*/}
                                    <Grid item>
                                        <Button variant="contained" size="small">
                                            Cancel
                                        </Button>
                                     </Grid>

                                     <Grid item>
                                        <Button variant="contained" size="small">
                                            Pending
                                        </Button>
                                     </Grid>

                                    
                                    
                            </Grid>
                    </form>
                </Paper>
            </Grid>       
        );
    }
}



