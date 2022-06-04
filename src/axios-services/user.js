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
            console.log("json response",json);
            const token = json.token;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", json.user.id);
            return json;
        } catch(error){
            console.log(error);
        };
    };

    export const loginUser = async (user) => {
        const url = `${apiUrl}/user/login`;
        console.log(url)
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
            console.log("token", token)
            localStorage.setItem("token", token);
            localStorage.setItem("userId", json.user.id);
            console.log("jsonuserid",json.user.id)
            return json;
        } catch(error){
            console.error(error);
        }
    }; 

