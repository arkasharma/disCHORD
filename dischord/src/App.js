import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import components
import LoginPage from "./loginPage";
import ChatPage from "./ChatPage";
import SignUpPage from "./SignUpPage";
import SignedUp from "./signedUp";
import NotLoggedIn from "./NotLoggedIn";
import SpotifySearch from "./SpotifySearch";
import { syncLoginDb } from "./syncLoginDb.js";

function App() {
  // create stateVariables
  // value of the variables will update everytime a keystroke is entired into the box
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Execute syncLoginDb when the component mounts
    syncLoginDb();
  }, []);

  return (
    //Wrap everything in router component so that everything has access
    <Router>
      <div className="App">
        {/* Route to home page, move content to home function */}
        <Switch>
          <Route exact path="/login">
            {/* Render LoginPage and pass down state props */}
            <LoginPage
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          </Route>
          {/*Add route to the link to signup */}
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          {/*Chat page route */}
          <Route exact path="/">
            <ChatPage username={username} password={password} />
          </Route>
          {/* Page after signed up with Dischord */}
          <Route exact path="/signedUp">
            <SignedUp />
          </Route>
          <Route exact path="/notLoggedIn">
            <NotLoggedIn />
          </Route>
          <Route exact path="/spotifySearch">
            <SpotifySearch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
