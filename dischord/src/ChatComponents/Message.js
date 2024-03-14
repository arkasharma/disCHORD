import React, { useEffect, useState, useRef } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import loginDb from '../loginDb.json'

const Message = ({username, selectedUser, message}) => {
    const [currentUserID, setCurrentUserID] = useState("");

    useEffect(() => {
        let unSub;
        unSub = onSnapshot(doc(db,"usernames", username), (doc)=> {
                if (doc.exists()) {
                    setCurrentUserID(doc.data().id);
                }
        })

        return () => {
            if (unSub) {
                unSub();
            }
        }
    }, [username]);
    
    /*
    let currentUserID;
    loginDb.validLogins.forEach(user => {
        if (user.username === username) {

            // If the username matches, store the userID and exit the loop
            currentUserID = user.id;
        }
    });
    */
    const ref = useRef()

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
