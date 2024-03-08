import React from 'react'
import Navbar from './Navbar.js'
import SearchBar from './SearchBar.js'
import Chats from './Chats.js'

const Sidebar = (prop) => {
    const { username } = prop;

    return (
        <div className='sidebar'>
            <Navbar username={username}/>
            <SearchBar username={username}/>
            <Chats username={username}/>
        </div>
        )
}

export default Sidebar
