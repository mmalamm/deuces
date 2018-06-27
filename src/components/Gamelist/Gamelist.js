import React, { Component } from "react";
import "./Gamelist.css";

class Gamelist extends Component {
  componentDidMount() {
    this.props.startListeningToGameChanges(this.props.username);
    this.props.startListeningToInviteChanges(this.props.username);
    this.props.startListeningToOpenGameChanges();
  }
  componentWillUnmount() {
    this.props.stopListeningToGameChanges(this.props.username);
    this.props.stopListeningToInviteChanges(this.props.username);
    this.props.stopListeningToOpenGameChanges();
  }
  render() {
    console.log(this.props.games);
    console.log(this.props.invites);
    console.log(this.props.openGames);
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
