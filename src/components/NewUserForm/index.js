import React, { Component } from "react";
import "./NewUserForm.css";

class NewUserForm extends Component {
  state = {
    username: ""
  };
  render() {
    const { submitNewUserForm, signOut, user } = this.props;
    console.log("newuserformlog", user);
    return (
      <div className="NewUserForm">
        <h1>NewUserForm</h1>
        <input
          type="text"
          onChange={e => this.setState({ username: e.target.value })}
        />
        <div
          className="NewUserForm-button"
          onClick={() => submitNewUserForm(this.state)}
        >
          submit
        </div>
        <div className="NewUserForm-button" onClick={() => signOut()}>
          sign out
        </div>
      </div>
    );
  }
}

export default NewUserForm;
