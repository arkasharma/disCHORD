import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const SignUpPage = () => {
  // init state variable
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  //init router hook to change navigation and direction
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //fetch the usernames from the database
  const fetchUsernames = async () => {
    try {
      const response = await fetch("http://localhost:8000/validLogins");

      if (!response.ok) {
        throw new Error("Bad network response unable to fetch data");
      }

      const jsonData = await response.json();

      // return the usernames that match in the database
      const userEntries = jsonData.filter(
        (item) => item.username === formData.username
      );
      return { userEntries };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { error: error.message };
    }
  };
  // handle the submission of the form
  const handleSub = (e) => {
    const user = { ...formData };
    //ADD: hashing for the password

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
    if (formData.password === "") {
      alert("Please enter a password");
      return;
    }
    //make process await the return of the existing usernames
    //check if the username already exists
    // if it does, alert the user and return
    // if the username is not already taken then the array will be empty

    fetchUsernames().then((existingUsernames) => {
      //check if the username already exists
      // if it does, alert the user and return
      // if the username is not already taken then the array will be empty
      if (existingUsernames.userEntries.length > 0) {
        alert("Username already exists, choose another username");
        return;
      }

      //submit form data to JSON database
      //IMPORTANT will need to change fetch address location
      fetch("http://localhost:8000/validLogins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then(() => history.push("/signedUp"));
    });
  };
  return (
    <>
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
    </>
  );
};

export default SignUpPage;
