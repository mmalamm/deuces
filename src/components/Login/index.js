import React from "react";
import "./Login.css";
import GithubLogo from "../AssetsSVG/GitHub_Logo_White.png";
import GoogleLogo from "../AssetsSVG/Google_Logo_Colors.png";
import AnimatedLogo from "../AssetsSVG/AnimatedLogo";

const Login = ({ signInWithGoogle, signInWithGithub }) => {
  return (
    <div className="Login">
      <AnimatedLogo cls="Login-bcLogo" />
      <h2 className="Login-name">锄大地 DEUCES</h2>
      <div className="Login-label">Log in with:</div>
      <div className="Login-button" onClick={signInWithGoogle}>
        <img className="Login-Logo" src={GoogleLogo} alt="" />
      </div>
      <div className="Login-button" onClick={signInWithGithub}>
        <img className="Login-Logo" src={GithubLogo} alt="" />
      </div>
    </div>
  );
};

export default Login;
