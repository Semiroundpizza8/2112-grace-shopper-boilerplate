import React, { useState } from 'react';
import { loginUser } from '../axios-services/user';
import { Link } from "react-router-dom";
import{createProductCart} from '../axios-services/cart';
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
        if (!user){
            return;
        }
        await loginUser(user);
        console.log(localStorage.getItem('token'));
        setUserName('');
        setPassword('');
        setLoggedIn(!!localStorage.getItem('token'));
        const localCart = JSON.parse(localStorage.getItem('ActiveCart'));
        if(localCart){
            const userId = localStorage.getItem('userId');
        console.log(localCart);
        let result = localCart.map(obj => {
            obj.userId = userId;
            return obj;
        }
            );
        let sentItems = result.map(obj => {
                createProductCart(obj.userId, obj.productId, obj.price, obj.quantity)

            }
                );
                
        //console.log(userId);
        console.log(localCart);
        localStorage.removeItem('ActiveCart');
    }
    };
    const updateUserName = (event) => {
        setUserName(event.target.value)
    };
    const updatePassword = (event) => {
        setPassword(event.target.value)
    };

    return (
        <div className='login'>
            <form onClick={handleSubmit} >
                <input className='textBoxLogin' type = 'text' placeholder = "UserName" value={username} onChange={updateUserName} />
                <input className='textBoxLogin' type = 'text' placeholder = "Password" value={password} onChange={updatePassword} />
                <Link to="/Shop">
                <button className='Btn_Login' >Login</button>
                </Link>
            </form>
            <Link className='reg_link' to = '/register'>Register Here!</Link>
        </div>
    )
};

export default LoggedIn;