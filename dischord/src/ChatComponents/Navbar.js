import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = (prop) => {
  const history = useHistory();
  const logout = () => {
    Cookies.set("loggedIn", false, { path: "/" });
    history.push("/login");
  };

  const { username } = prop;

  return (
    <div className="navbar">
      <span className="logo">DisCHORD</span>
      <div className="user">
        <span>{username}</span>
        <div onClick={logout}>
          {/* make clickable element*/}
          <span class="clickable">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
