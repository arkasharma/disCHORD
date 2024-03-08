import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../firebase.js";
import loginDb from "../loginDb.json";

const Chats = (prop) => {
    const { username } = prop;
    const [chats, setChats] = useState([])

    // Iterate through the validLogins array to find the user with the matching username
    let currentUserID;
    loginDb.validLogins.forEach(user => {
        if (user.username === username) {

            // If the username matches, store the userID and exit the loop
            currentUserID = user.id;
        }
    });
    
    useEffect(() => {
       const getChats = () => {
        // listen to make changes real-time
        const unsub = onSnapshot(doc(db, "userChats", currentUserID), (doc) => {
            setChats(doc.data())
          });

          return () => {
            unsub();
          };
        };
       
        currentUserID && getChats()
    }, [currentUserID]);

    console.log(Object.entries(chats));

    return (
        <div className='chats'>
            {Object.entries(chats)?.map((chat) => (
            <div className="userChat" key={chat[0]}>
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.username}</span>
                    <p>{chat[1].userInfo.lastMessage?.text}</p>
                </div>
            </div> 
            ))}
        </div>
    );
};

export default Chats
