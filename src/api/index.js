const baseUrl = `../../../api`



export const getAllUsers = async (username, password) => {
   
    try {
        const url = `${baseUrl}/users/me`;
        const token = localStorage.getItem('UserToken')
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: {
                'username': username,
                'password': password
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("this is my getMe error!", error)
    }
}