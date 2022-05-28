import React, { useState } from 'react';
import { loginUser } from '../axios-services/user';

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
        setLoggedIn(!!localStorage.getItem('token'))
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
        </div>
    )
};

export default LoggedIn;