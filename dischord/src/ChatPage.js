import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "./ChatComponents/Sidebar.js";
import Chat from "./ChatComponents/Chat.js";
import SpotifySearch from "./SpotifySearch.js";

//chat page is set to be the home page "/"
const ChatPage = (props) => {
  const { username, password } = props;

  //loggedIn is stored in the cookies and we need to check if it is true that the user is logged in
  //extract the cookie
  //useHistory hook for accessing the history object
  const history = useHistory();
  //extracting and parsing cookies to check user login status
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  let cookieDict = {};
  //loop through each cookie to create a dictionary
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
        <Sidebar username={username} password={password}/>
        <Chat />
        <SpotifySearch />
      </div>
    </div>
  );
};

export default ChatPage;
