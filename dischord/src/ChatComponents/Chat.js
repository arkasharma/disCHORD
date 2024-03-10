import Messages from './Messages.js'
import Input from './Input.js'

const Chat = ({ username, selectedUser }) => {

    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{selectedUser?.username}</span>
            </div>
            <Messages username={username} selectedUser={selectedUser}/>
            <Input username={username} selectedUser={selectedUser} />
        </div>
    )
}

export default Chat
