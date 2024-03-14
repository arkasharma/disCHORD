import React, { useEffect, useState, useRef } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';

const Message = ({username, selectedUser, message}) => {
    const [currentUserID, setCurrentUserID] = useState("");

    useEffect(() => {
        let unSub;

        // is username is valid, search usernames databse to find the user's id
        if (username) {
        unSub = onSnapshot(doc(db,"usernames", username), (doc)=> {
                if (doc.exists()) {
                    setCurrentUserID(doc.data().id);
                }
        })
        }
        return () => {
            if (unSub) {
                unSub();
            }
        }
    }, [username]);
    
    const ref = useRef()

    // scroll if current chat is not in user's screen
    useEffect (() => {
        ref.current?.scrollIntoView({behavior:"smooth"})
        }, [message]);


    return (
        <div ref={ref} >
            <div className={`message ${message.senderID === currentUserID && "owner"}`} >
                <div className="messageContent">
                    <p>{message.text}</p>
                </div>
            </div>
        </div>
    );
};

export default Message
