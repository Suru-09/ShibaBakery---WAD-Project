import React, {Component} from "react";
import SignUpPage from "./SignUpPage";
import HomePage from "./HomePage"
import { render } from "react-dom";


export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div>
                 <HomePage/>
            </div>
           
        );
    }

}

const appDiv = document.getElementById("app");
render(<App name="Suru" />, appDiv);