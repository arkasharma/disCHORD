import { useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "./ChatComponents/Sidebar.js";
import Chat from "./ChatComponents/Chat.js";
import SpotifySearch from "./SpotifySearch.js";
import IframeComponent from "./NoteWorthy.js";
import "./ChatPage.css";

//chat page is set to be the home page "/"
const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

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

  const username = cookieDict["username"];

  //rendered components of the chat page
  return (
    <div className="home">
      <div className="container">
        <Sidebar className="sidebar" username={username} setSelectedUser={setSelectedUser} />
        <Chat username={username} selectedUser={selectedUser} />
        <div className="spot-search">
          <div className="half-space">
            <SpotifySearch />
          </div>
          <div className="half-space">
            <IframeComponent />
          </div>          
        </div>        
      </div>
    </div>
  );
};

export default ChatPage;
