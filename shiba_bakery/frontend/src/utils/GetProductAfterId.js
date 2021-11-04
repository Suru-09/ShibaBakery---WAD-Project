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

        const response = await fetch('/api/get-product-by-id' + '?product_id=' + productId, requestOptions);
        return await response.json();
}