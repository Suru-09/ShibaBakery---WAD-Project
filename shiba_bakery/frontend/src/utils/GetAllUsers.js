import GetCookie from "./GetCookie";

export default async function GetAllUsers() {
        const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": GetCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('/api/sign-up', requestOptions);
        return await response.json();
}