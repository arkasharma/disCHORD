import React, { useState, useEffect } from 'react';
import { arrayUnion, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { v4 as uuid } from 'uuid';


const Input = ({username, selectedUser}) => {

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
  
    // create combined id: concatenation of sender and receiver's id
    const combinedID = 
        currentUserID > selectedUser?.id
        ? currentUserID + selectedUser?.id
        : selectedUser?.id + currentUserID;

    const [text, setText] = useState("")

    const handleSend = async () => {
        if (combinedID && selectedUser != null) {

            // chat is identified by the combined id
            // update the chats database with new message
            await updateDoc(doc(db, "chats", combinedID), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderID:currentUserID,
                date: Timestamp.now(),
            }),
            });

        // update userChats database (which stores the users a user is chatting with)
        await updateDoc(doc(db, "userChats", currentUserID), {
            [combinedID + ".lastMessage"]:{
                text
            },
            [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", selectedUser?.id), {
            [combinedID + ".lastMessage"]:{
                text
            },
            [combinedID + ".date"]: serverTimestamp(),
        });
    }
        setText("")
    };

    return (
        <div className="input">
            <input 
            type="text" 
            placeholder="Message" 
            onChange={(e)=>setText(e.target.value)}
            value={text}
            />
            <div className="send">
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input
