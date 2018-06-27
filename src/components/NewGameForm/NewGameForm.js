import React, { Component } from "react";
import Toggle from "react-toggle";
import Modal from "../Modal/Modal";
import InviteMaker from "./InviteMaker";
import "./NewGameForm.css";
import "./Toggle.css";

class NewGameForm extends Component {
  state = {
    gameName: "",
    inviteOnly: false,
    invitedUsernames: []
  };
  handleChange = e => {
    const gameName = e.target.value;
    this.setState(() => ({ gameName }));
  };
  handleSubmit = e => {
    const { gameName, inviteOnly, invitedUsernames } = this.state;
    this.props.submitNewGameForm({ gameName, inviteOnly, invitedUsernames });
  };
  handleToggle = e => {
    this.setState(oldState => {
      return {
        inviteOnly: !oldState.inviteOnly
      };
    });
  };
  addName = name => {
    this.setState(oldState => ({
      invitedUsernames: oldState.invitedUsernames.concat([name])
    }), () => console.log(this.state));
  };

  isOnList = name =>  !!this.state.invitedUsernames.find(n => n === name);

  render() {
    console.log(this.state);
    const { hideModal } = this.props;
    /// still have to add invite functionality
    // invite usernames[]
    return (
      <Modal>
        <div className="NewGameForm">
          <div className="NewGameForm-close" onClick={hideModal}>
            ✖
          </div>
          <h2>Create New Game</h2>
          <div>Game Name:</div>
          <input onChange={this.handleChange} />
          <label>
            <span>Invite Only?</span>
            <Toggle
              defaultChecked={this.state.inviteOnly}
              onChange={this.handleToggle}
            />
          </label>
          <InviteMaker isOnList={this.isOnList} addName={this.addName} />
          <button onClick={this.handleSubmit}>Create Game</button>
        </div>
      </Modal>
    );
  }
}

export default NewGameForm;
