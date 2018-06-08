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
        <div>
          invites will go here
        </div>
        <div>
          myGames will go here
        </div>
        <div>
          openGames will go here
        </div>
      </div>
    );
  }
}

export default Gamelist;
