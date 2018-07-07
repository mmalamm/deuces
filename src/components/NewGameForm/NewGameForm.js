import React, { Component } from "react";
import Toggle from "react-toggle";
import Modal from "../Modal/Modal";
import InviteMaker from "./InviteMaker";
import AddedList from "./AddedList";
import "./NewGameForm.css";
import "./Toggle.css";

class NewGameForm extends Component {
  state = {
    gameName: "",
    inviteOnly: false,
    invitedUsernames: [],
    invitedUsers: []
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
  addUser = user => {
    this.setState(
      oldState => ({
        invitedUsers: oldState.invitedUsers.concat([user]),
        invitedUsernames: oldState.invitedUsernames.concat([user.username])
      }),
      () => console.log(this.state)
    );
  };

  isOnList = name => !!this.state.invitedUsernames.find(n => n === name);

  render() {
    console.log(this.state);
    const { hideModal } = this.props;
    const { invitedUsers, inviteOnly } = this.state;
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
            <Toggle defaultChecked={inviteOnly} onChange={this.handleToggle} />
          </label>
          <InviteMaker isOnList={this.isOnList} addUser={this.addUser} />
          <ul>
            {invitedUsers.map(u => (
              <li key={u.username}>
                <img src={u.photoURL} alt="" />
                <span>{u.username}</span>
              </li>
            ))}
          </ul>
          <button onClick={this.handleSubmit}>Create Game</button>
        </div>
      </Modal>
    );
  }
}

export default NewGameForm;
