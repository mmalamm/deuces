import React, { Component } from "react";
import { RotateLoading } from "respinner";

import Pencil from "../AssetsSVG/Pencil";
import { database } from "../../fire";
import ChangePicForm from "../../containers/ChangePicForm";

import "./NewUserForm.css";

const isValidUsername = str => str.replace(/\s/g, "").toLowerCase().length > 3;

class NewUserForm extends Component {
  constructor(props) {
    super(props);
    const { displayName } = props.user;
    const username = displayName.replace(/\s/g, "").slice(0, 20);
    const buttonDisabled = !isValidUsername(displayName);
    this.state = {
      username,
      buttonDisabled,
      buttonText: !buttonDisabled ? "submit" : "4+ characters",
      showModal: false,
      inputDisabled: false
    };
  }
  closeModal = e => this.setState({ showModal: false });
  showModal = e => this.setState({ showModal: true });
  handleInputChange = e => {
    const username = e.target.value;
    if (username.match(/\s/g)) return;
    const usernameKey = username.toLowerCase();
    if (!usernameKey.match(/^[a-z0-9]{0,20}$/)) return;
    const len = usernameKey.length;
    const buttonDisabled = len < 4;
    const buttonText = len < 4 ? "4+ characters" : "submit";
    this.setState({ username, buttonDisabled, buttonText });
  };
  handleSubmit = async e => {
    const { buttonDisabled, username } = this.state;
    if (buttonDisabled) return;
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
    const usernameKey = username.toLowerCase();
    const snapshot = await database
      .ref(`/users/${usernameKey}/public`)
      .once("value");
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
      this.props.submitNewUserForm({ username });
    }
  };
  handleKeyPress = e => {
    if (e.key === "Enter") this.handleSubmit();
  };
  render() {
    const { signOut, user } = this.props;
    const { photoURL, displayName } = user;
    const {
      username,
      inputDisabled,
      buttonDisabled,
      buttonText,
      showModal
    } = this.state;
    console.log(this.props);
    return (
      <div className={`NewUserForm ${showModal && "NewUserForm-blurred"}`}>
        {this.props.modal === "CHANGE_PIC_FORM" && <ChangePicForm />}
        <img
          className="NewUserForm-profilePic"
          src={photoURL}
          alt={displayName}
          onClick={this.props.showChangePicForm}
        />
        <div
          className="NewUserForm-changePicButton"
          onClick={this.props.showChangePicForm}
        >
          <Pencil color={"#708090"} />
        </div>
        <div className="NewUserForm-label">Choose a username:</div>
        <input
          className={`NewUserForm-textInput ${inputDisabled &&
            "NewUserForm-textInputDisabled"}`}
          type="text"
          autoFocus
          spellCheck="false"
          value={username}
          onChange={this.handleInputChange}
          disabled={inputDisabled}
          onKeyPress={this.handleKeyPress}
          ref={input => {
            this.inputField = input;
          }}
        />
        <div
          className={`NewUserForm-button ${
            buttonDisabled ? "NewUserForm-buttonDisabled" : ""
          }`}
          onClick={this.handleSubmit}
        >
          {buttonText}
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
