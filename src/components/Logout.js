import React from 'react';

const Logout = (props) => {
    const { loggedIn, setLoggedIn } = props;

    const handleClick = () => {
        localStorage.removeItem('token')
        setLoggedIn (!!localStorage.getItem("token"))
    };

    return(
        <>
            <button onClick={handleClick}>Logout</button>
        </>
    )
};

export default Logout;