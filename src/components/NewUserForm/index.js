import React, { Component } from "react";
import "./NewUserForm.css";
import Modal from "../Modal";
import Pencil from "../AssetsSVG/Pencil";
import { database } from "../../fire";
import { RotateLoading } from "respinner";

// user sees their info in a form
// user can upload and set their profile pic
// user is prompted to choose a username
// input field with username that validates username syntax
// smart submit button that validates username uniqueness

const isValidUsername = str =>
  str
    .slice()
    .replace(/\s/g, "")
    .toLowerCase().length > 5;

class NewUserForm extends Component {
  state = {
    showModal: false,
    username: this.props.user.displayName.replace(/\s/g, ""),
    buttonDisabled: !isValidUsername(this.props.user.displayName),
    buttonText: isValidUsername(this.props.user.displayName)
      ? "submit"
      : "6+ characters",
    inputDisabled: false
  };
  closeModal = e => {
    e.preventDefault();
    this.setState({ showModal: false });
  };
  showModal = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };
  handleInputChange = e => {
    const username = e.target.value;
    if (username.match(/\s/g)) return;
    const usernameKey = username.toLowerCase();
    if (!usernameKey.match(/^[a-z0-9]{0,20}$/)) return;
    const len = usernameKey.length;
    let { buttonText, buttonDisabled } = this.state;
    if (len < 6) {
      buttonText = "6+ characters";
      buttonDisabled = true;
    } else {
      buttonText = "submit";
      buttonDisabled = false;
    }

    this.setState({ username, buttonDisabled, buttonText });
  };
  handleSubmit = e => {
    if (this.state.buttonDisabled) return;
    this.setState({
      buttonText: (
        <RotateLoading
          duration={1}
          stroke="#708090"
          opacity={0.4}
          size={30}
          className="NewUserForm-spinner"
        />
      ),
      buttonDisabled: true,
      inputDisabled: true
    });
    const usernameKey = this.state.username.toLowerCase();
    database
      .ref(`/users/${usernameKey}/public`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          this.setState(
            {
              buttonText: "name taken :(",
              buttonDisabled: true,
              inputDisabled: false
            },
            () => this.inputField.focus()
          );
        } else {
          this.props.submitNewUserForm({ username: this.state.username });
        }
      });
  };
  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };
  render() {
    const { signOut, user } = this.props;
    return (
      <div className="NewUserForm">
        {this.state.showModal && (
          <Modal>
            <div className="NewUserForm-changePicModal">
              <h1>Modal</h1>
              <div className="NewUserForm-close" onClick={this.closeModal}>
                ✖
              </div>
            </div>
          </Modal>
        )}
        <img
          className="NewUserForm-profilePic"
          src={user.photoURL}
          alt={user.displayName}
          onClick={this.showModal}
        />
        <div className="NewUserForm-changePicButton" onClick={this.showModal}>
          <Pencil color={"#708090"} />
        </div>
        <div className="NewUserForm-label">Choose a username:</div>
        <input
          className={`NewUserForm-textInput ${
            this.state.inputDisabled ? "NewUserForm-textInputDisabled" : ""
          }`}
          type="text"
          autoFocus
          spellCheck="false"
          value={this.state.username}
          onChange={this.handleInputChange}
          disabled={this.state.inputDisabled}
          onKeyPress={this.handleKeyPress}
          ref={input => {
            this.inputField = input;
          }}
        />
        <div
          className={`NewUserForm-button ${
            this.state.buttonDisabled ? "NewUserForm-buttonDisabled" : ""
          }`}
          onClick={this.handleSubmit}
        >
          {this.state.buttonText}
        </div>
        <div className="NewUserForm-signoutText">
          or{" "}
          <a className="NewUserForm-link" onClick={() => signOut()}>
            sign out
          </a>
        </div>
      </div>
    );
  }
}

export default NewUserForm;
