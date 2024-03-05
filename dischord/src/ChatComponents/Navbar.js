import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const logout = () => {
    Cookies.set("loggedIn", false, { path: "/" });
  };

  return (
    <div className="navbar">
      <span className="logo">DisCHORD</span>
      <div className="user">
        <span>UserName</span>
        <div onClick={logout}>Logout</div>
      </div>
    </div>
  );
};

export default Navbar;
