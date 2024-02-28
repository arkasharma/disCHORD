import React from 'react'

const SearchBar = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Search for user"/>
            </div>
            <div className="userChat">
                <div className="userChatInfo">
                    <span>otherUserName</span>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
