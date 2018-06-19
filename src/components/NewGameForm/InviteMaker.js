import React, { Component } from "react";

import { database } from "../../fire";

import QuestionMark from '../AssetsSVG/question_mark.png';

const userNotFound = { photoURL: QuestionMark, username: 'User Not Found' };

class InviteMaker extends Component {
  state = {
    nameInput: "",
    userData: null
  };
  debounceTimer = null;
  cbMaker = input => () => {
    if (input.length === 0) {
      return this.setState({
        userData: null
      });
    };
    database.ref(`users/${input}/public`).once("value", ss => {
      const userData = ss.val() || userNotFound;
      this.setState({
        userData
      });
    });
  };
  onChange = e => {
    const username = e.target.value;
    if (username.match(/\s/g)) return;
    const usernameKey = username.toLowerCase();
    if (!usernameKey.match(/^[a-z0-9]{0,20}$/)) return;

    this.setState(() => {
      return {
        nameInput: username
      };
    }, () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(
        this.cbMaker(usernameKey),
        850
      )
    });
  };
  render() {
    return (
      <div className="App">
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.nameInput}
        />
        {
          !!this.state.userData &&
          <div style={{ color: "white" }}>
            <img
              className="Homebar-userinfo-img"
              src={this.state.userData.photoURL}
              alt=""
              onClick={this.props.showChangePicForm}
            />
            <span>{this.state.userData.username}</span>
          </div>
        }
      </div>
    );
  }
}

export default InviteMaker;
