import React from "react";
import "./Login.css";

const Login = ({ signInWithGoogle, signInWithGithub }) => {
  return (
    <div className="Login">
      <button onClick={signInWithGoogle}>Log In with Google</button>
      <button onClick={signInWithGithub}>Log In with Github</button>
    </div>
  );
};

export default Login;
