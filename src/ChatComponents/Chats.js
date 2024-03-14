import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

const Chats = ({ username, handleSelect }) => {
    const [chats, setChats] = useState([])
    const [currentUserID, setCurrentUserID] = useState("");

    useEffect(() => {
        let unSub;

        // is username is valid, search usernames database to find the user's id
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


    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
            <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1]?.userInfo)}>
                <div className="userChatInfo">
                    <span>{chat[1].userInfo?.username}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div> 
            ))}
        </div>
    );
};

export default Chats
