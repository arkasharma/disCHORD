import { useState } from "react";
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
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
    if (formData.password === "") {
      alert("Please enter a password");
      return;
    }
    //ADD: submit form data to JSON database
    fetch("http://localhost:8000/validLogins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => console.log("new Blog Added"));
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
      </form>
    </>
  );
};

export default SignUpPage;
