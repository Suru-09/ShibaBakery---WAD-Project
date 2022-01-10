import React, {useEffect, useState} from "react";
import '../../static/css/productScreen.css'
import GetProductAfterId from "../utils/GetProductAfterId";
import { withRouter } from "react-router-dom";
import { Paper } from "@material-ui/core";

const ProductPage = ({ productId }) => {

  const [product, setProduct] = useState('');
  const [ingredients,setIngredients] = useState('');

  useEffect(() => {
     async function getProduct() {
         if(productId !== 0) {
             const product = await GetProductAfterId(productId);
            setProduct(product);
            setIngredients(product.ingredients);
         }
         else {
             console.log("Product id este: " + productId + " in ProductPage");
         }
     }
     getProduct();
  }, [])

  const setCartItem = (item) => {
    let cart_list = JSON.parse(localStorage.getItem("cart") || "[]");
    let cnt = 0;
    if(cart_list !== [] ) {
      for(let i = 0; i < cart_list.length; ++i)
        if(cart_list[i].id == item.id) {
          if(product.stock_count >= cart_list[i].stock_count + 1)
              cart_list[i].stock_count++;
          cnt++;
        }
          
      if(!cnt) {
        item.stock_count = 1;
        cart_list.push(item);
        console.log(cart_list);
        console.log(item);
      }  

    }

    window.localStorage.setItem('cart', JSON.stringify(cart_list));
  }


  return (

    <Paper elevation={12} className="productpaper">
        <div className="productscreen">

                <div className="productscreen__left">
                <div className="left__image">
                    <img className="image_product" src={product.image}/>
                </div>
                <div className="left__info">
                    <p className="left__name">{product.name}</p>
                    <p className="info">Description: {product.description}</p>
                </div>
                </div>
                <div className="productscreen__right">
                <div className="right__info">
                    <p className="info">
                    Price:
                    <span className="info">${product.price}</span>
                    </p>
                    <p className="info">
                    Product type:
                    <span>
                        {ingredients.includes("egg") > 0 ? "Non Vegan" : ingredients.includes("milk") > 0 ? "Non Vegan" : ingredients.includes("butter") > 0 ? "Non Vegan" : "Vegan"}
                    </span>
                    </p>
                    <p className="info">
                    Availability: 
                    <span>
                        {product.stock_count > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                    </p>
                    <p className="info">
                    <button type="button" onClick={() => {setCartItem(product)}} >
                        Add To Cart
                    </button>
                    </p>
                </div>
                </div>

        </div>
    </Paper>
    );
};

export default withRouter(ProductPage);


