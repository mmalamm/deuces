import React, { Component } from "react";

import QuestionMark from "../AssetsSVG/question_mark.png";

import queryUsersCall from "../../utils/queryUsersCall";

const userNotFound = [{ photoURL: QuestionMark, username: "User Not Found" }];

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
    }

    queryUsersCall(input).then(data => {
      this.setState({ userData: data || userNotFound });
    });
  };
  onChange = e => {
    const username = e.target.value;
    if (username.match(/\s/g)) return;
    const usernameKey = username.toLowerCase();
    if (!usernameKey.match(/^[a-z0-9]{0,20}$/)) return;

    this.setState(
      () => ({ nameInput: username }),
      () => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(this.cbMaker(usernameKey), 850);
      }
    );
  };
  addUser = user => e => {
    console.log(user);
    this.props.addUser(user);
  };
  render() {
    const { nameInput, userData } = this.state;
    return (
      <div className="App">
        <input type="text" onChange={this.onChange} value={nameInput} />
        {!!userData &&
          userData.map(d => (
            <div key={d.username} style={{ color: "white" }}>
              <img
                className="Homebar-userinfo-img"
                src={d.photoURL}
                alt={d.username}
              />
              <span>{d.username}</span>
              {!this.props.isOnList(d.username) &&
                d.username !== userNotFound.username && (
                  <button
                    onClick={this.addUser({
                      username: d.username,
                      photoURL: d.photoURL
                    })}
                  >
                    Invite
                  </button>
                )}
            </div>
          ))}
      </div>
    );
  }
}

export default InviteMaker;
