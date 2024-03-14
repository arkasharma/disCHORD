import React from 'react'
import Navbar from './Navbar.js'
import SearchBar from './SearchBar.js'
import Chats from './Chats.js'

const Sidebar = ({ username, setSelectedUser })  => {

    const handleSelect = (userInfo) => {
        setSelectedUser(userInfo);
      };

    return (
        <div className='sidebar'>
            <Navbar username={username}/>
            <SearchBar username={username}/>
            <Chats username={username} handleSelect={handleSelect} />
        </div>
        )
}

export default Sidebar
