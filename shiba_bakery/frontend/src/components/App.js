import React, {Component} from "react";
import SignUp from "./signUp";
import { render } from "react-dom";


export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div>
                 <SignUp/>
            </div>
           
        );
    }

}

const appDiv = document.getElementById("app");
render(<App name="Suru" />, appDiv);