import React from 'react'
import Navbar from './Navbar.js'
import SearchBar from './SearchBar.js'
import Chats from './Chats.js'

const Sidebar = (props) => {
    const { username, password } = props;

    return (
        <div className='sidebar'>
            <Navbar username={username} password={password}/>
            <SearchBar/>
            <Chats/>
        </div>
        )
}

export default Sidebar
