import React, { Component } from "react";
import "./NewUserForm.css";

// user sees their info in a form
// user can upload and set their profile pic
// user is prompted to choose a username
// input field with username that validates username syntax
// smart submit button that validates username uniqueness

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
