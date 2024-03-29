import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";
import CryptoJS from "crypto-js";
import { syncLoginDb } from "./syncLoginDb.js";

const LoginPage = ({ username, setUsername, password, setPassword }) => {
  const history = useHistory();
  let loggedIn = false;
  const [isLoggedIn, setIsLoggedIn] = useState("init");
  //set up fetched data from firebase
  //const [loginData, setLoginData] = useState([]);
  const [passwordDb, setPasswordDb] = useState("");

  useEffect(() => {
    let unSub;
    if (username) {
      unSub = onSnapshot(doc(db, "usernames", username), (doc) => {
        if (doc.exists()) {
          setPasswordDb(doc.data().password);
        }
      });
    }
    return () => {
      if (unSub) {
        unSub();
      }
    };
  }, [username]);

  /*
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "usernames"));
      setLoginData(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);
  console.log(loginData);
*/


  const checkValidation = (e) => {
      syncLoginDb();
    console.log("db password: ", passwordDb)
    console.log("dad55", CryptoJS.SHA256("dad55").toString())
    console.log("hash", CryptoJS.SHA256(password).toString())
    e.preventDefault();

    if (passwordDb !== "" &&
      CryptoJS.SHA256(password).toString() === passwordDb
    ) {
      loggedIn = true;
      Cookies.set("loggedIn", loggedIn, { expires: 1 / 24, path: "/" });
      setIsLoggedIn("true");
      //console.log(isLoggedIn);
      history.push("/");
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
