import React from "react";
import '../../static/css/productScreen.css'
import GetProductAfterId from "../utils/GetProductAfterId";

const ProductPage = ({ productId }) => {

    const product = GetProductAfterId(productId);
    console.log("Am intrat cumva aici!");

    return (
      <div className="productscreen">
       
            <div className="productscreen__left">
              <div className="left__image">
                <img src={product.imageUrl} alt={product.name} />
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
                  <button type="button">
                    Add To Cart
                  </button>
                </p>
              </div>
            </div>
          
      </div>
    );
  };
  
  export default ProductPage;
  

