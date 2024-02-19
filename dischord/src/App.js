import "./App.css";
import { useState } from "react";

function App() {
  // create stateVariables
  // value of the variables will update everytime a keystroke is entired into the box
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <h1>DisCHORD</h1>
      {/*creating login page with username and password fields*/}
      <div className="login">
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password"> Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="button" name="Submit" id="Submit" value="SUBMIT" />
      </div>
    </div>
  );
}

export default App;
