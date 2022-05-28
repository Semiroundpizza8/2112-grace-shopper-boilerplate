import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Footer from "./Footer";
import Header from "./Header";
import Cart from "./Cart";
import ProductScreen from "./ProductScreen";
import Home from "./Home";
import Products from "./Products";
import CartScreen from "./CartScreen";

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
        <div className="content">
          <Switch>
            <Route exact path={"/"}>
              <Home />
            </Route>
            
            <Route exact path={"/Shop"}>
              <Products />
            </Route>
            <Route path="/products/:id">
              <ProductScreen />
            </Route>
            
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
