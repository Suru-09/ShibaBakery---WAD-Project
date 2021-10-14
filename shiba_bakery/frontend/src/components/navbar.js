import '../../static/css/navbar.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return(
        
        <nav className="navbar">
            <NavLink to="/" exact>
                Web Navigation Bar
            </NavLink>
        </nav>
          
    )
}
export default Navbar;