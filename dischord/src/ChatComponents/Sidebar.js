import React from 'react'
import Navbar from './Navbar.js'
import SearchBar from './SearchBar.js'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Navbar/>
            <SearchBar/>
        </div>
        )
}

export default Sidebar
