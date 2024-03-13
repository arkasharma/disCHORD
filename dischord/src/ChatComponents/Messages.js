import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import loginDb from '../loginDb.json'
import Message from './Message.js';

const Messages = ({ username, selectedUser }) => {

    let currentUserID;
    loginDb.validLogins.forEach(user => {
        if (user.username === username) {

            // If the username matches, store the userID and exit the loop
            currentUserID = user.id;
        }
    });

    const combinedID = 
        currentUserID > selectedUser?.id
        ? currentUserID + selectedUser?.id
        : selectedUser?.id + currentUserID;

    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        let unSub;
        if (combinedID && selectedUser != null){ 
            unSub = onSnapshot(doc(db,"chats", combinedID), (doc)=> {
                doc.exists() && setMessages(doc.data().messages)
            })
       }

        return () => {
            if (unSub) {
                unSub();
            }
        }
    },[combinedID, selectedUser])

    console.log(messages);
    return (
        <div className="messages">
            {messages.map(m => (                
                <Message username={username} selectedUser={selectedUser} message={m} key={m.id}/>
            ))}
        </div>
    )
}

export default Messages