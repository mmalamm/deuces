import React, { Component } from "react";
import Modal from "../Modal";
import "./NewGameForm.css";

class NewGameForm extends Component {
  state = {
    gameName: ""
  };
  handleChange = e => {
    this.setState(() => ({ gameName: e.target.value }));
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
          <div>Invite only?</div>
          <div>Invite:</div>
          <input type="text" name="" id="" />
        </div>
      </Modal>
    );
  }
}

export default NewGameForm;
