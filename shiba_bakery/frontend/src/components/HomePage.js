import React, {Component} from "react";
import SignUpPage from "./SignUpPage"
import LoginPage from "./LoginPage"
import { render } from "react-dom";
import { BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"; 
import { Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import Navbar from "./navbar";

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.renderHomePage = this.renderHomePage.bind(this);
    }
    
    renderHomePage() {
       
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        Shiba Bakery SPL
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup variant="contained" color="primary">
                        <Button color="primary" to='/sign-up' component = {Link}>
                            SignUp Page
                        </Button>
                        <Button color="secondary" to='/login' component = {Link}>
                             Login Page
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

            
        );
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path='/home'>
                        {this.renderHomePage()}
                    </Route>
                    <Route path='/sign-up' component={SignUpPage}></Route>
                    <Route path='/login' component={LoginPage}></Route>
                </Switch>
            </Router>
        );
    }

}