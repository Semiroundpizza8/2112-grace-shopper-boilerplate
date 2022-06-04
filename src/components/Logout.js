import React from 'react';
import "../../src/style/Logout.css"

const Logout = (props) => {
    const { loggedIn, setLoggedIn } = props;

    const handleClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        //setLoggedIn(!!localStorage.getItem("token"))
    };

    return(
        <>
            <button className='logout' onClick={handleClick}>Logout</button>
        </>
    )
};

export default Logout;