import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from './ChatComponents/Sidebar.js'
import Chat from './ChatComponents/Chat.js'


//chat page is set to be the home page "/"
const ChatPage = () => {
  //loggedIn is stored in the cookies and we need to check if it is true that the user is logged in
  //extract the cookie
  const history = useHistory();
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  let cookieDict = {};
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    let name = parts[0];
    let value = parts[1];
    cookieDict[name] = value;
  }
  // if user is not logged in redirect to the notLoggedIn page to give an appropriate message
  if (cookieDict["loggedIn"] !== "true") {
    history.push("/notLoggedIn");
  }

  //rendered components of the chat page
  return (
  <div className="home">
    <div className="container">
      <Sidebar/>
      <Chat/>
    </div>
  </div>
  )
};

export default ChatPage;
