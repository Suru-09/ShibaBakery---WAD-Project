import React from 'react';
import GetCookie from "./GetCookie";

export default async function GetUserAfterId(userId) {
        const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": GetCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('/api/get-user-by-id' + '?user_id=' + userId, requestOptions);
        return await response.json();
}