import React, { useState } from 'react';
import { loginUser } from '../axios-services/user';
import { Link } from "react-router-dom";
import "../../src/style/Login.css";


const LoggedIn = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            username: username,
            password: password
        };
        console.log("Hello LoggedIn!!!!")
        await loginUser(user);
        console.log(localStorage.getItem('token'));
        setUserName('');
        setPassword('');
        setLoggedIn(!!localStorage.getItem('token'))
    };
    const updateUserName = (event) => {
        setUserName(event.target.value)
    };
    const updatePassword = (event) => {
        setPassword(event.target.value)
    };

    return (
        <div className='login'>
            <form >
                <input className='textBoxLogin' type = 'text' placeholder = "UserName" value={username} onChange={updateUserName} />
                <input className='textBoxLogin' type = 'text' placeholder = "Password" value={password} onChange={updatePassword} />
                <Link to="/Shop">
                <button onClick={handleSubmit} className='Btn_Login' >Login</button>
                </Link>
            </form>
            <Link className='reg_link' to = '/register'>Register Here!</Link>
        </div>
    )
};

export default LoggedIn;