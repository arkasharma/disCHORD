import React, { useState } from 'react'
import { collection, query, where, getDocs, getDoc } from "firebase/firestore"
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { serverTimestamp } from "firebase/firestore";
import {db} from "../firebase.js"
import loginDb from "../loginDb.json";

const SearchBar = (prop) => {
    const { username } = prop;
    const [newUsername, setNewUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    // Iterate through the validLogins array to find the user with the matching username
    let currentUserID;
    loginDb.validLogins.forEach(user => {
        if (user.username === username) {

            // If the username matches, store the userID and exit the loop
            currentUserID = user.id;
        }
    });
    
    // Now userID contains the ID of the currentUser (the logged-in user)

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"), 
            where("username", "==", newUsername));

        try {
        const querySnapshot = await getDocs(q); 
        querySnapshot.forEach((doc) => {
         setUser(doc.data())
        });
        } catch(err) {
            setErr(true)
        }
};

    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        // check whether the group exists by checking chats collection in firestore
        // create new group if chat doesn't exist
        const combinedID = 
        currentUserID > user.id
        ? currentUserID + user.id
        : user.id + currentUserID;

        try {
            const res = await getDoc(doc(db, "chats", combinedID));

            // if no chat exists between given users, create chat
            if (!res.exists()) {
                // messages field initialized to an empty array for a new chat (no previous chats)
                await setDoc(doc (db, "chats", combinedID), {messages:[]});

                // create userChats (which stores a user and their latest message)
                await updateDoc(doc(db, "userChats", currentUserID), {
                    [combinedID+".userInfo"]: {
                        id:user.id,
                        username:user.username
                    },
                    [combinedID+".date"]:serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.id), {
                    [combinedID+".userInfo"]: {
                        id:currentUserID,
                        username:username
                    },
                    [combinedID+".date"]:serverTimestamp()
                });
            }
        } catch (err) {}

        setUser(null);
        setNewUsername("");
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input 
                type="text" 
                placeholder="Search for user to start a chat!" 
                onKeyDown={handleKey} 
                onChange={e=>setNewUsername(e.target.value)}
                value={newUsername}
                />
            </div>
            {err && <span>User not found</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <div className="userChatInfo">
                    <span>{user.username}</span>
                </div>
            </div>} 
        </div>
    )
}

export default SearchBar
