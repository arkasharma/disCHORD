import React, { useState, useEffect } from 'react'
import { collection, query, where, getDocs, getDoc } from "firebase/firestore"
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore"; 
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js"

const SearchBar = (prop) => {
    const { username } = prop;
    const [newUsername, setNewUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

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
    
    // Now userID contains the ID of the currentUser (the logged-in user)

    const handleSearch = async () => {
        // send a query to firebase to see if entered username exists
        const q = query(
            collection(db, "users"), 
            where("username", "==", newUsername));

        // if username exists, setUser to the username
        // else, set error to true     
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
        // if user pressed "Enter", start search
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
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
                // data saved to order chats by timestamp
                // updating userChat doc for currentUser
                await updateDoc(doc(db, "userChats", currentUserID), {
                    [combinedID+".userInfo"]: {
                        id:user.id,
                        username:user.username
                    },
                    [combinedID+".date"]:serverTimestamp()
                });

                // updating userChat doc for selectedUser (receiver)
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
