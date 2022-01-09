import React, {useEffect, useState} from 'react'

// CSS
import '../../static/css/navbar.css'

// Pages
import Searchbar from './SearchBar';
import GetUserAfterName from "../utils/GetUserAfterUsername";

//Material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

//Router
import {
  Link,
} from "react-router-dom";
import { createBrowserHistory } from "history"

const browserHistory = createBrowserHistory()

const Navbar = ({navbarCall, userID}) => {

  const [user, setUser] = useState('');

  useEffect(() => {

     async function getUser() {
         if(userID !== -1 && typeof(userID) != "undefined" && userID ) {
             console.log("Eu sunt userId: " + userID);
             const user = await GetUserAfterName(userID);
             setUser(user);
         } else {
             console.log("Eu sunt userId: " + userID);
             console.log("User doesn't exist in Navbar");
         }
     }
     getUser();
  }, [])

  const handleProduct = (productId) => {
      navbarCall(productId);
  }

  return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color= "primary">
                <Toolbar >

                    {/*This is SearchBar div*/}
                    <div className="container">
                        <div className="search_div">
                              <Button to="/home"  component={Link} color="inherit">
                                    <HomeIcon sx={{ mr: 1 }} />
                              </Button>

                              <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                              >
                                {/* <MenuIcon /> */}
                            </IconButton>
                            <Searchbar  history={browserHistory} handleCallback={handleProduct} />
                        </div>

                        {/*This is the div with the buttons Login and Cart*/}
                        <div className="button_div">
                            <div className="nav_buttons">

                                <CardHeader
                                  avatar={
                                    <Avatar
                                    >
                                        {userID && user ? user.last_name.charAt(0).toUpperCase() + user.first_name.charAt(0).toUpperCase() : "G"}
                                    </Avatar>
                                  }
                                  title = {userID && user ? user.last_name + " " + user.first_name : "Guest"}
                                />

                              <Button to="/login" component={Link} color="inherit">
                                Login
                              </Button>

                              <Button to="/cart"  component={Link} color="inherit">
                                <ShoppingCartIcon sx={{ mr: 1 }} />
                                Cart
                              </Button>
                              
                              {
                                user.last_name === 'admin' ? 
                                  <Button to="/adminPage"  component={Link} color="inherit">
                                            Admin
                                  </Button> : null
                              }
                              
                              </div>
                        </div>
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
  )
}

export default Navbar;

