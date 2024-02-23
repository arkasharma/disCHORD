import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = ({ username, setUsername, password, setPassword }) => {
  const history = useHistory();
  let usernames;
  let passwords;

  const fetchData = () => {
    return fetch("http://localhost:8000/validLogins")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad network response unable to fetch data");
        }
        return response.json();
      })
      .then((jsonData) => {
        usernames = jsonData.map((item) => item.username);
        passwords = jsonData.map((item) => item.password);
        return { usernames, passwords };
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
        // verify if the user has logged in
        // check if the username inputted matches the one of usernames in the database
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
    <>
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
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="submit" type="submit">
          SUBMIT
        </button>
        <br />
        <span>
          {/* Router Link instead of rerouting using a tag, react router will intercept the url to where we are going to */}
          Need an account? <Link to="/signup">Signup </Link>
        </span>
      </form>
    </>
  );
};

export default LoginPage;
