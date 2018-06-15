import React, { Component } from "react";

import debounce from "lodash/debounce";
import { database } from "../../fire";

class InviteMaker extends Component {
  state = {
    nameInput: "",
    incomingData: null
  };
  cbMaker = input => {
    return () => {
      console.log("callback1 running", input);
      if (input.length === 0) return;
      database.ref(`users/${input}/public`).once("value", ss => {
        const incomingData = ss.val();
        console.log("callback2 running", incomingData);
        this.setState({
          incomingData
        });
      });
    };
  };
  onChange = e => {
    const username = e.target.value;
    if (username.match(/\s/g)) return;
    const usernameKey = username.toLowerCase();
    if (!usernameKey.match(/^[a-z0-9]{0,20}$/)) return;

    this.setState(() => {
      console.log("hehe", username);
      return {
        nameInput: username
      };
    }, debounce(this.cbMaker(usernameKey), 850, { leading: false, trailing: true }));
  };
  render() {
    return (
      <div className="App">
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.nameInput}
        />
        <div style={{ color: "white" }}>
          {JSON.stringify(this.state.incomingData)}
        </div>
      </div>
    );
  }
}

export default InviteMaker;
