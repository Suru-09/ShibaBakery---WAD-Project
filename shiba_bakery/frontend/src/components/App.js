import React, {Component} from "react";
import SignUp from "./signup";
import { render } from "react-dom";
import { BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
    } from "react-router-dom";

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

//export default App;
const appDiv = document.getElementById("app");
render(<App name="Suru" />, appDiv);