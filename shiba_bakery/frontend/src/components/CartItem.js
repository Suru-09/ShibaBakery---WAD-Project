import '../../static/css/cartItem.css';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import { Select, InputLabel, Box } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';


const CartItem = ({quantity, homePageCallback, imageUrl, description, price, name, category, productId, stock_count }) => {

    const changeSelectValue = (value) => {
        stock_count = value;
        console.log(value);
    }

   
    const [quant, setQuantity] = React.useState(quantity);
    
    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    const createSelectQt = (count) =>{
        let arr = [];
        for(let i=0; i<count; ++i){
            arr[i] = i+1;
        }
         return(
             arr.map((qt) => {
                return(
                    <MenuItem value={qt}>{qt}</MenuItem>
                )
             })
         );
    };

  return (
    <Grid className="cartitem" elevation= {8}>
        <div className='upper_info' >
            <div className="cartitem__image">
                <img className="image" src={imageUrl} alt={name} />               
            </div>
            <p className="cartitem__name" >{name}</p>
            <p className="cartitem__price">Price: ${price}</p>
        </div>
        
        
        
        <div className='lower_info'>
            <Button to={`/product/${productId}`} component={Link} className="info__button" variant='contained' size='small'>
                View
            </Button>
            <InputLabel>Quantity</InputLabel>
            <Select
                value={quant}
                lable="Quantity"
                multiline
                variant='outlined'
                onChange={handleChange}
            >
                {createSelectQt(stock_count)}
            </Select>

            <Button
                className="cartItem__deleteBtn"
                variant='contained'
                size='small'
                // onClick={() => removeHandler(item.product)}
            >
                Remove
            </Button>
        </div>
    </Grid>
  );
};

export default CartItem;
