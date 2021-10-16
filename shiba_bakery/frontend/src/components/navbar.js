import '../../static/css/navbar.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"; 

const Navbar = () => {
    return(
        
        <Router>
            <nav className="navbar">
                <NavLink to="/" exact>
                    Web Navigation Bar
                </NavLink>
             </nav>
        </Router>
        
    )
}
export default Navbar;