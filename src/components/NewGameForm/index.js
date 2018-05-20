import React, { Component } from "react";
import Modal from "../Modal";
import "./NewGameForm.css";

class NewGameForm extends Component {
  state = {
    gameName: ""
  };
  handleChange = e => {
    const gameName = e.target.value;
    this.setState(() => ({ gameName }));
  };
  handleSubmit = e => {
    const { username } = this.props.user;
    const { gameName } = this.state;
    this.props.submitNewGameForm({ username, gameName });
  };
  render() {
    const { hideModal } = this.props;
    return (
      <Modal>
        <div className="NewGameForm">
          <div className="NewGameForm-close" onClick={hideModal}>
            ✖
          </div>
          <h2>Create New Game</h2>
          <div>Game Name:</div>
          <input onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Create Game</button>
        </div>
      </Modal>
    );
  }
}

export default NewGameForm;
