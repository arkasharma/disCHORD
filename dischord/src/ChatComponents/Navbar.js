import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    const logout = () => {

    }
  
    return (
        <div className='navbar'>
            <span className='logo'>DisCHORD</span>
            <div className="user">
                <span>UserName</span>
                <Link to="/notLoggedIn">Logout</Link>
            </div>
        </div>
    )
}

export default Navbar
