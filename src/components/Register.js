import React, { useState } from 'react';
import { registerUser } from '..axios-services/user';

const Register = (props) => {
    const { isLoggedIn, setIsLoggedIn } = props;
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        const user = {
            username: userName,
            password: password,
            email: email
        }
        console.log(user)
        await registerUser(user);
        //console.log(localStorage.getItem(token));
        setUserName('');
        setPassword('');
        setIsLoggedIn(!!localStorage.getItem("token"))
    };
    const updateUserName = (event) => {
        setUserName(event.target.value)
    };
    const updatePassword = (event) => {
        setPassword(event.target.value)
    };

    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <input type = 'text' placeholder = "Register Username" value = {userName} onChange = {updateUserName} />
                <input type = 'text' placeholder = "Register Password" value = {password} onChange = {updatePassword} />
                <button> Register </button>
            </form>
        </div>
    )
}

export default Register;