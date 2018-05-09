import React, { Component } from "react";
import "./Homebar.css";

class Homebar extends Component {
  render() {
    const { showNewGameForm, signOut, username, photoURL, points } = this.props;
    return (
      <div className="Homebar">
        <div className="Homebar-userinfo">
          <img className="Homebar-userinfo-img" src={photoURL} alt="" />
          <p className="Homebar-userinfo-txt">{username}</p>
          <p className="Homebar-userinfo-txt">{points}</p>
        </div>
        <div className="Homebar-buttons">
          <button className="Homebar-button" onClick={showNewGameForm}>
            New Game
          </button>
          <button className="Homebar-button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }
}

export default Homebar;
