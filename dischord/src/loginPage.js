import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";

const LoginPage = ({ username, setUsername, password, setPassword }) => {
  const history = useHistory();
  let loggedIn = false;
  const [isLoggedIn, setIsLoggedIn] = useState("init");
  const fetchData = () => {
    return fetch("http://localhost:8000/validLogins")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad network response unable to fetch data");
        }
        return response.json();
      })
      .then((jsonData) => {
        // usernames = jsonData.map((item) => item.username);
        // passwords = jsonData.map((item) => item.password);
        //grab only entry with that specific username
        const userEntries = jsonData.filter(
          (item) => item.username === username
        );
        return { userEntries };
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return { error: error.message };
      });
  };

  const checkValidation = (e) => {
    e.preventDefault();

    // call to fetch the data and then must wait for the return
    fetchData()
      .then((data) => {
        //data contains the information from the json server
        console.log(data);
        //check if the password matches
        // COULD CHANGE: could change based on later specifications
        // Allows for multiple entries of the same username, but should work in either case
        const matchingUsernames = data.userEntries;
        for (let i = 0; i < matchingUsernames.length; i++) {
          if (bcrypt.compareSync(password, matchingUsernames[i].password)) {
            //set cookie so that user can be redirected back to the chat page if not logged in
            loggedIn = true;
            Cookies.set("loggedIn", loggedIn, { expires: 1 / 24, path: "/" });
            setIsLoggedIn("true");
            //console.log(isLoggedIn);
            history.push("/");
          }
        }

        if (loggedIn !== true) {
          //isLoggedIn = false;
          setIsLoggedIn("false");
          loggedIn = false;
          //console.log(isLoggedIn);
          Cookies.set("loggedIn", loggedIn, { expires: 1 / 24, path: "/" });
          //Cookies.set("username", username, { expires: 1 / 24, path: "/" });
          setPassword("");
        }

        if (loggedIn === true) {
          Cookies.set("username", username, { expires: 1 / 24, path: "/" });
        }

        // if (usernames.find((e) => e === username)) {
        //   //alert("Here!");
        //   console.log("sucess");
        //   history.push("/chat");
        // }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div id="hom">
      <h1>DisCHORD</h1>
      {/*creating login page with username and password fields*/}
      <form className="login" onSubmit={checkValidation}>
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
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Conditionally render whether you have failed your login */}
        {isLoggedIn === "false" && <span id="failedLogin"> Failed Login.</span>}
        <button id="submit" type="submit">
          SUBMIT
        </button>
        <br />
        <span>
          {/* Router Link instead of rerouting using a tag, react router will intercept the url to where we are going to */}
          Need an account? <Link to="/signup">Signup </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
