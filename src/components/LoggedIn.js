import React, { useState } from 'react';
import { loginUser } from '../axios-services/user';
import { Link } from "react-router-dom";


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
        await loginUser(user);
        console.log(localStorage.getItem('token'));
        setUserName('');
        setPassword('');
        setLoggedIn(!!localStorage.getItem('token'));
        const localCart = JSON.parse(localStorage.getItem('ActiveCart'));
        if(localCart){
            const userId = localStorage.getItem('userId');
        console.log(localCart);
        let result = localCart.map(obj => {obj.userId = userId});
        //console.log(userId);
        console.log(localCart);
        localStorage.setItem('cart', JSON.stringify(localCart));
    }
    };
    const updateUserName = (event) => {
        setUserName(event.target.value)
    };
    const updatePassword = (event) => {
        setPassword(event.target.value)
    };

    return (
        <div>
            <form onSubmit ={ handleSubmit }>
                <input type = 'text' placeholder = "UserName" value={username} onChange={updateUserName} />
                <input type = 'text' placeholder = "Password" value={password} onChange={updatePassword} />
                <button>Login</button>
            </form>
            <Link to = '/register'>Register Here!</Link>
        </div>
    )
};

export default LoggedIn;