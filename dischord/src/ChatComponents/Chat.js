import React from 'react'
import Messages from './Messages.js'
import Input from './Input.js'

const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>Name</span>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat
