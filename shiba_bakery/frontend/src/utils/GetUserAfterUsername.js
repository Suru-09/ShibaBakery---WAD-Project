import React from 'react';
import GetCookie from "./GetCookie";

export default async function GetUserAfterName(username) {
        const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": GetCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('/api/get-user-by-username' + '?username=' + username, requestOptions);
        return await response.json();
}