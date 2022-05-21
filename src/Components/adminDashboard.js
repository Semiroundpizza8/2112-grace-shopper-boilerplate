import React, {useState, useEffect} from 'react';
import { getAllUsers } from '../../api'


function AdminDashboard(props) {



    const {loggedIn, setLoggedIn, username, setUsername, user, setUser} = props;
    
    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);
    }
    
    useEffect(() => { (async () => {
        const myRoutines = await getAllUsers(username);
        getAllUsers(myRoutines);
        })();
      }, []);


    return (<div> {
        loggedIn ? <> {
        <>    <div className='me'>
                <h2>Hello, {username}</h2> <p>Not you?<button className="LogOut"
        onClick={logOut}>Log out</button>
</p>
            </div>
<div>    </div>
</>

        } </> : <div>No user logged in! </div>
    } </div>)

}

export default AdminDashboard;