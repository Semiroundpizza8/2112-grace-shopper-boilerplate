import React from "react";
import "../../src/style/Header.css";
import Logo from "../Assets/Coconut Furniture Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { BrowserRouter, Link } from "react-router-dom";

function Header(props) {
  const { loggedIn, username } = props;
  return (
    <div className="header">
   
        <Link to="/">
          <img className="header_logo" src={Logo} alt="Coconut Logo" />
        </Link>
      

      <div className="header_search">
        <input className="header_searchInput" type="text"></input>
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <div className="header_option">
          {!loggedIn ? <span className="header_optionLineOne">Hello Guest</span> : 
          <span className="header_optionLineOne">Hello {username}</span>}

          <Link to="/LoggedIn">
          {!loggedIn ? <span className="header_optionLineTwo">Sign In</span> : 
          <span className="header_optionLineTwo">Log Out</span> }
          </Link> 
        </div>

        <div className="header_option">
          <span className="header_optionLineOne">Previous</span>
          <span className="header_optionLineTwo">Orders</span>
        </div>

        <div className="header_optionBasket">
          <LocalShippingIcon />
          <span className="header_optionLineTwo header_basketCount">0</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
