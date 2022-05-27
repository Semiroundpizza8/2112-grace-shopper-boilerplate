import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Footer from "./Footer";
import Header from "./Header";
import Cart from "./Cart";
import ProductScreen from "./ProductScreen";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");

  // const[user, setUser] = useState();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("UserToken"));
  }, []);

  //  const logOut = () => {
  //      localStorage.removeItem("UserToken");
  //      setLoggedIn(false);
  //  }

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
      <Header />
      
      <BrowserRouter>
        <div id="header">
          <h1 className="header">The furniture store</h1>
          <div id="routeBox">
            {!loggedIn ? (
              <>
                <button className="button">
                  <Link id="link" to="/login">
                    Login
                  </Link>
                </button>
                <button className="button">
                  <Link id="link" to="/register">
                    SignUp
                  </Link>
                </button>
                <button className="button">
                  <Link id="link" to="/cart">
                  Cart</Link>
                </button>
              </>
            ) : (
              <>
                <button className="button">
                  {" "}
                  <Link id="link" to="/user">
                    User
                  </Link>
                </button>{" "}
                <button className="button">
                  <Link id="link" to="/cart">
                  Cart</Link>
                </button>
              </>
            )}{" "}
          </div>
        </div>

        <Route path="/login"> </Route>

        <Route path="/register"> </Route>

        <Route path="/user"> </Route>
        <Route path="/cart"> <Cart/></Route>
        <Route path="/product"><ProductScreen/> </Route>
      </BrowserRouter>
      <p>API Status: {APIHealth}</p>
    
      
      <Footer />
    </div>
  );
};

export default App;
