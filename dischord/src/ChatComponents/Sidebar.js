import React from 'react'
import Navbar from './Navbar.js'
import SearchBar from './SearchBar.js'
import Chats from './Chats.js'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Navbar/>
            <SearchBar/>
            <Chats/>
        </div>
        )
}

export default Sidebar
