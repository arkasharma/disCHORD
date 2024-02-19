import { Link } from "react-router-dom";

const LoginPage = ({ username, setUsername, password, setPassword }) => {
  return (
    <>
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
        <br />
        <span>
          {/* Router Link instead of rerouting using a tag, react router will intercept the url to where we are going to */}
          Need an account? <Link to="/signup">Signup </Link>
        </span>
      </div>
    </>
  );
};

export default LoginPage;
