import React, { Component } from "react";
import "./Gamelist.css";
import DeleteButton from "./DeleteButton";

class Gamelist extends Component {
  componentDidMount() {
    this.props.startListeningToGameChanges(this.props.usernameKey);
    this.props.startListeningToInviteChanges(this.props.usernameKey);
    this.props.startListeningToOpenGameChanges();
  }
  componentWillUnmount() {
    this.props.stopListeningToGameChanges(this.props.usernameKey);
    this.props.stopListeningToInviteChanges(this.props.usernameKey);
    this.props.stopListeningToOpenGameChanges();
  }
  deleteGame = gameKey => {
    return e => {
      this.props.deleteGame(gameKey);
    };
  };
  render() {
    const { games, invites, openGames } = this.props;
    return (
      <div className="Gamelist">
        <h1>bovine corvus</h1>
        {invites.length !== 0 && <h2>Invites</h2>}
        {invites.length !== 0 && (
          <div>
            {invites.map(i => (
              <div key={i.gameKey}>
                <h3>invite!</h3>
              </div>
            ))}
          </div>
        )}
        <h2>My Games</h2>
        <div>
          {games.map(g => (
            <div key={g.gameKey}>
              <h3>{g.gameName}</h3>
              {g.gameOwner === this.props.username && (
                <DeleteButton deleteGame={this.deleteGame(g.gameKey)} />
              )}
            </div>
          ))}
        </div>
        <h2>Open Games</h2>
        <div>
          {openGames.map(g => (
            <div key={g.gameKey}>
              <h3>{g.gameName}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gamelist;
