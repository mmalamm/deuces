import React, { Component } from "react";
import "./Homebar.css";

class Homebar extends Component {
  render() {
    const {
      createGame,
      showNewGameForm,
      signOut,
      displayName,
      photoURL,
      uid
    } = this.props;
    return (
      <div className="Homebar">
        <div className="Homebar-userinfo">
          <img className="Homebar-userinfo-img" src={photoURL} alt="" />
          <p className="Homebar-userinfo-txt">{displayName}</p>
          <p className="Homebar-userinfo-txt">{!!uid && 100}</p>
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
