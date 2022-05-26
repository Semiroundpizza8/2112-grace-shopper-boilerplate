import React from "react";
import "../../src/style/Footer.css";
import Logo from "../Assets/Coconut Furniture Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Footer = () => {
  return (
    <div className="footer">
      <img className="footer_logo" src={Logo} alt="Coconut Logo" />
    </div>
  );
};

export default Footer;
