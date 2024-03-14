import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import { syncLoginDb } from "./syncLoginDb.js";

//create function to hash the password
function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

const SignUpPage = () => {
  // init state variable
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  //set up fetched data from firebase
  const [usernameData, setUsernameData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "usernames"));
      setUsernameData(querySnapshot.docs.map((doc) => doc.data().username));
    };
    fetchData();
  }, []);
  console.log(usernameData);

  //init router hook to change navigation and direction
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle the submission of the form
  const handleSub = (e) => {
    const user = { ...formData };

    // Handle form submission logic here
    //if the form does not have all the required information just return
    //don't save the form
    e.preventDefault();
    if (formData.email === "") {
      alert("Please enter an email");
      return;
    }
    if (formData.username === "") {
      alert("Please enter a username");
      return;
    }
    if (formData.password.length < 5) {
      alert("Password must be at least 5 characters long");
      return;
    }
    //check if the password contains atleast a letter and a number
    if (
      !formData.password.match(/[a-z]/g) ||
      !formData.password.match(/[0-9]/g)
    ) {
      alert("Password must contain at least one letter and one number");
      return;
    }

    //check if the username has invalid characters
    //check if the username contains a { or } or " or ' or [ or ]
    if (
      formData.username.includes("{") ||
      formData.username.includes("}") ||
      formData.username.includes('"') ||
      formData.username.includes("'") ||
      formData.username.includes("[") ||
      formData.username.includes("]")
    ) {
      alert("Username cannot contain { or }");
      return;
    }
    if (formData.password === "") {
      alert("Please enter a password");
      return;
    }
    //check if the username already exists
    //fetch usernames from database
    if (usernameData.includes(formData.username)) {
      alert("Username already exists");
      return;
    } else {
      // hash the password
      user.password = hashPassword(user.password);
      //submit form data to JSON database
      //IMPORTANT will need to change fetch address location
      fetch("http://localhost:8000/validLogins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then(() => {
        syncLoginDb();
        history.push("/signedUp");
      });
    }
  };

  return (
    <div id="hom">
      <h2 id="title">Sign Up for DisCHORD!</h2>
      {/*creating login page with username and password fields*/}
      <form className="signUp" onSubmit={handleSub}>
        <label htmlFor="password"> Please Enter Your Email</label>
        <input type="text" name="email" id="email" onChange={handleChange} />
        <label htmlFor="username"> Please Enter Your Desired Username </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />
        <label htmlFor="password"> Please Enter Your Desired Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button id="submit" type="submit">
          SUBMIT
        </button>
        <br />
        <span>
          {/* Router Link instead of rerouting using a tag, react router will intercept the url to where we are going to */}
          Go back to Login Page? <Link to="/login">Login Page</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUpPage;
