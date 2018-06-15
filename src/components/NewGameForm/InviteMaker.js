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
        console.log("callback2 running");
        const incomingData = ss.val();
        this.setState({
          incomingData
        });
      });
    };
  };
  onChange = e => {
    const nameInput = e.target.value;
    this.setState(() => {
      console.log("hehe", nameInput);
      return {
        nameInput
      };
    }, debounce(this.cbMaker(nameInput), 850));
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
