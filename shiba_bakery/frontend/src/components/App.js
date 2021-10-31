import React, {Component} from "react";
import HomePage from "../pages/HomePage"
import Navbar from "./navbar"
import Footer from "./Footer"
import '../../static/css/app.css'

import { render } from "react-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = "Shiba Bakery";
    }

    render() {

        return(
            <>
                <div className="app_div">
                    <div className="footer-wrap">
                        <Navbar/>
                        <HomePage/>
                        <div className="footer">
                            <Footer/>
                        </div>
                    </div>
                </div>

            </>
           
        );
    }
}

const appDiv = document.getElementById("app");
render(<App name="Suru" />, appDiv);