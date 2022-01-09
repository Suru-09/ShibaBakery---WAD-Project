import React from 'react';
import GetCookie from "./GetCookie";

export default async function GetAllOrders() {
         const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": GetCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('/api/get-order', requestOptions);
        return await response.json();
}