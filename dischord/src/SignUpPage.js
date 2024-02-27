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
    //submit form data to JSON database
    //IMPORANT will need to change fetch address location
    fetch("http://localhost:8000/validLogins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => history.push("/signedUp"));
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
