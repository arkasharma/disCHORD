import { Link } from "react-router-dom";
const SignedUp = () => {
  return (
    <>
      <h2> You have now signed up for DisCHORD!</h2>
      <Link to="/login"> Click here to Login!</Link>
    </>
  );
};

export default SignedUp;
