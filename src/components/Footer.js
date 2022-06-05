import React from "react";
import "../style/Footer.css";

const Logo = "/Assets/Coconut Furniture Logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <img className="footer_logo" src={Logo} alt="Coconut Logo" />
    </div>
  );
};

export default Footer;
