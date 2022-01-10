import React, {useEffect, useState} from "react";
import '../../static/css/productScreen.css'
import GetProductAfterId from "../utils/GetProductAfterId";
import { withRouter } from "react-router-dom";

const ProductPage = ({ productId }) => {

  const [product, setProduct] = useState('');

  useEffect(() => {
     async function getProduct() {
         if(productId !== 0) {
             const product = await GetProductAfterId(productId);
            setProduct(product);
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
      <div className="productscreen">

            <div className="productscreen__left">
              <div className="left__image">
                <img src={product.image}/>
              </div>
              <div className="left__info">
                <p className="left__name">{product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Description: {product.description}</p>
              </div>
            </div>
            <div className="productscreen__right">
              <div className="right__info">
                <p>
                  Price:
                  <span>${product.price}</span>
                </p>
                <p>
                  Status:
                  {/* <span>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </span> */}
                </p>
                <p>
                  Qty
                  {/* <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select> */}
                </p>
                <p>
                  <button type="button" onClick={() => {setCartItem(product)}} >
                    Add To Cart
                  </button>
                </p>
              </div>
            </div>

      </div>
    );
};

export default withRouter(ProductPage);


