import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import Message from "./Message.js";

const Messages = ({ username, selectedUser }) => {
  const [currentUserID, setCurrentUserID] = useState("");

  useEffect(() => {
    let unSub;

    // is username is valid, search usernames databse to find the user's id
    if (username) {
      unSub = onSnapshot(doc(db, "usernames", username), (doc) => {
        if (doc.exists()) {
          setCurrentUserID(doc.data().id);
        }
      });
    }
    return () => {
      if (unSub) {
        unSub();
      }
    };
  }, [username]);

  const combinedID =
    currentUserID > selectedUser?.id
      ? currentUserID + selectedUser?.id
      : selectedUser?.id + currentUserID;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unSub;

    // if a chat is selected, find the chat associated with the two users (current and selected user)
    // set messages to messages array fetched from database
    if (combinedID && selectedUser != null) {
      unSub = onSnapshot(doc(db, "chats", combinedID), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    }

    return () => {
      if (unSub) {
        unSub();
      }
    };
  }, [combinedID, selectedUser]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message
          username={username}
          selectedUser={selectedUser}
          message={m}
          key={m.id}
        />
      ))}
    </div>
  );
};

export default Messages;
