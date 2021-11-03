import React from 'react';
import GetCookie from "./GetCookie";

export default async function getProductAfterId(productId) {
        const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": GetCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('api/get-product-by-id' + productId, requestOptions);
        const products = await response.json();

       return products;
}