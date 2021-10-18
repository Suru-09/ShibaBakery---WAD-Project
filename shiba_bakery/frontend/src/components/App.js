import React, {Component} from "react";
import HomePage from "../pages/HomePage"
import Navbar from "./navbar"
import { render } from "react-dom";





export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <>
                <Navbar></Navbar>
                <HomePage/>
            </>
           
        );
    }

    

}

const appDiv = document.getElementById("app");
render(<App name="Suru" />, appDiv);