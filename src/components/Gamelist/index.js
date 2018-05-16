import React, { Component } from "react";
import "./Gamelist.css";

class Gamelist extends Component {
  componentDidMount() {
    this.props.startListeningToGameChanges(this.props.username);
  }
  componentWillUnmount() {
    this.props.stopListeningToGameChanges(this.props.username);
  }
  render() {
    console.log(this.props.games);
    const { games } = this.props;
    return (
      <div className="Gamelist">
        <h1>bovine corvus</h1>
        {games.map(g => <div key={g.gameKey}>{g.gameName}</div>)}
      </div>
    );
  }
}

export default Gamelist;
