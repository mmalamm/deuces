import React, { Component } from "react";
import "./NewUserForm.css";
import Modal from "../Modal";

// user sees their info in a form
// user can upload and set their profile pic
// user is prompted to choose a username
// input field with username that validates username syntax
// smart submit button that validates username uniqueness

class NewUserForm extends Component {
  state = {
    showModal: false,
    username: this.props.user.displayName
  };
  closeModal = e => {
    e.preventDefault();
    this.setState({ showModal: false });
  };
  showModal = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };
  render() {
    const { submitNewUserForm, signOut, user } = this.props;
    console.log("newuserformlog", user);
    return (
      <div className="NewUserForm">
        {this.state.showModal && (
          <Modal>
            <div className="NewUserForm-changePicModal">
              <h1>Modal</h1>
              <button onClick={this.closeModal}>close</button>
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
          <svg width="2rem" height="2rem" viewBox="0 0 512 512" fill="gray">
            <g>
              <path
                fill="gray"
                d="M422.953,176.019c0.549-0.48,1.09-0.975,1.612-1.498l21.772-21.772c12.883-12.883,12.883-33.771,0-46.654   l-40.434-40.434c-12.883-12.883-33.771-12.883-46.653,0l-21.772,21.772c-0.523,0.523-1.018,1.064-1.498,1.613L422.953,176.019z"
              />
              <polygon
                fill="gray"
                points="114.317,397.684 157.317,440.684 106.658,448.342 56,456 63.658,405.341 71.316,354.683  "
              />
              <polygon
                fill="gray"
                points="349.143,125.535 118.982,355.694 106.541,343.253 336.701,113.094 324.26,100.653 81.659,343.253    168.747,430.341 411.348,187.74  "
              />
            </g>
          </svg>
        </div>
        <div className="NewUserForm-label">Choose a username:</div>
        <input
          className="NewUserForm-textInput"
          type="text"
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
        />
        <div
          className="NewUserForm-button"
          onClick={() => submitNewUserForm(this.state)}
        >
          submit
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
