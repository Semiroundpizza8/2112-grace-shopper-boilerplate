import React from 'react';
import "../../src/style/Logout.css"

const Logout = (props) => {
    const { loggedIn, setLoggedIn } = props;

    const handleClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        //setLoggedIn(!!localStorage.getItem("token"))
    };

    return(
        <>
            <button onClick={handleClick}>Logout</button>
        </>
    )
};

export default Logout;