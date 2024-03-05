import React from 'react'

const SearchBar = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Search for user"/>
            </div>
            <div className='chats'>
            <div className="userChat">
                <div className="userChatInfo">
                    <span>Name</span>
                </div>
            </div> 
        </div>
        </div>
    )
}

export default SearchBar
