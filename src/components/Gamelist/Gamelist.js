import React, { Component } from "react";
import "./Gamelist.css";
import DeleteButton from "./DeleteButton";

import Invite from "./Invite";

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
  deleteGame = gameKey => e => {
    this.props.deleteGame(gameKey);
  };
  renderInvites = invites =>
    invites.length ? (
      <div>
        <h3>Invites</h3>
        <div>
          {invites.map(inv => <Invite key={inv.gameKey} invite={inv} />)}
        </div>
      </div>
    ) : null;
  renderGames = games =>
    games.length ? (
      <div>
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
      </div>
    ) : null;
  render() {
    const { games, invites, openGames } = this.props;
    return (
      <div className="Gamelist">
        <h1>bovine corvus</h1>
        {this.renderInvites(invites)}
        {this.renderGames(games)}
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
