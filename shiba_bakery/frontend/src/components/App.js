import React, {Component} from "react";
import Signup from "./signup";
import { render } from "react-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div className="center">
                <Signup/>
            </div>
        );
    }

}

//export default App;
const appDiv = document.getElementById("app");
render(<App name="Suru" />, appDiv);