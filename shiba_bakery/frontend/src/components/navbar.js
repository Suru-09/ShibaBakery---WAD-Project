import '../../static/css/navbar.css'
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from './SearchBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"; 
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import CartScreen from '../pages/CartPage';
import HomePage from "../pages/HomePage";


const Navbar = () => {

  return (
    <Router>

        <Box sx={{ flexGrow: 1 }}
        >
            <AppBar position="static" fullWidth>
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
                                <MenuIcon />
                            </IconButton>
                            <Searchbar/>
                        </div>

                        {/*This is the div with the buttons Login and Cart*/}
                        <div className="button_div">
                            <div className="nav_buttons">
                              <Button to="/login" component={Link} color="inherit">
                                Login
                              </Button>

                              <Button to="/cart_screen"  component={Link} color="inherit">
                                <ShoppingCartIcon sx={{ mr: 1 }} />
                                Cart
                              </Button>

                              </div>
                        </div>
                    </div>

                </Toolbar>
            </AppBar>
        </Box>


        <Switch>
            <Route exact path='/login' component={LoginPage}/>
            <Route  path='/sign-up' component={SignUpPage}/>
            <Route  path='/cart_screen' component={CartScreen}/>
            <Route path='/home' compoennt={HomePage}/>
        </Switch>

    </Router>
  )
}
export default Navbar;

