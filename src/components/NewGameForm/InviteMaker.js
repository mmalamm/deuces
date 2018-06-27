import React, { Component } from "react";

import { query_users } from '../../utils/api';

import QuestionMark from "../AssetsSVG/question_mark.png";
import axios from "axios";

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
    axios.post(query_users, { input }).then(({ data }) => {
      this.setState({ userData: data || userNotFound })
    })
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
  addName = name => e => {
    this.props.addName(name);
  }
  render() {
    const { nameInput, userData } = this.state;
    return (
      <div className="App">
        <input
          type="text"
          onChange={this.onChange}
          value={nameInput}
        />
        {!!userData && userData.map(d => (
          <div key={d.username} style={{ color: "white" }}>
            <img
              className="Homebar-userinfo-img"
              src={d.photoURL}
              alt={d.username}
            />
            <span>{d.username}</span>
            {!this.props.isOnList(d.username) && d.username !== "User Not Found" && <button onClick={this.addName(d.username)}> + </button>}
          </div>
        ))}
      </div>
    );
  }
}

export default InviteMaker;
