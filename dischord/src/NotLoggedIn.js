import { Link } from "react-router-dom";
const NotLoggedIn = () => {
  return (
    <div id="hom">
      <h2 id="notSignedIn"> Not Logged In</h2>
      <span id="signIn">
        Please use the following link to signin:
        <br />
        <Link to="/login">Click here to Login!</Link>{" "}
      </span>
    </div>
  );
};

export default NotLoggedIn;