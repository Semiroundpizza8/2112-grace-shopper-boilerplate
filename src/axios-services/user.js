import axios from "axios";
const apiUrl = 'http://localhost:4000/api';

export const getAllUsers = async (username, password) => {
   
        try {
            const token = localStorage.getItem('UserToken')
            const response = await axios.get(apiUrl, {
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
            console.error("this is my getAllUsers error!", error)
        }
    }

    export const registerUser = async (user) => {
        const url = `${apiUrl}/user/register`;
        try {
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(user)
            })
            const json = await response.json();
            if (!json.user) {
                return false;
            } 
            else {
                localStorage.setItem('UserToken', json.token);
                return true;
            }}
            catch(error){
                console.log("this is register user api error", error)
            }
    };




    export const loginUser = async (user) => {
        const url = `${apiUrl}/user/login`;
        try{
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(user)
            });
            const json = await response.json();
            const token = json.token;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", json.id);
            return json;
        } catch(error){
            console.error(error);
        }
    }; 