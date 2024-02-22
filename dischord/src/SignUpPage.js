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
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    //ADD: submit form data to JSON database
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
        <button type="submit">SUBMIT</button>
        <br />
      </form>
    </>
  );
};

export default SignUpPage;
