import React, { useState } from 'react';
import { arrayUnion, doc, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import loginDb from '../loginDb.json';
import { v4 as uuid } from 'uuid';


const Input = ({username, selectedUser}) => {

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

    const [text, setText] = useState("")

    const handleSend = async () => {
        if (combinedID) {
            await updateDoc(doc(db, "chats", combinedID), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderID:currentUserID,
                date: Timestamp.now(),
            }),
            });
        }

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
