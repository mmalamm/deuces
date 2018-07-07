import React, { Component } from "react";
import { storage, auth } from "../../fire";
import axios from "axios";
import { CircularLoading } from "respinner";
import Dropzone from "react-dropzone";
import { change_photo } from "../../utils/api";

import "./ChangePicForm.css";

class ChangePicForm extends Component {
  state = {
    picScale: 1,
    selectedPic: this.props.selectedPic,
    zoomLevel: 0,
    selectedFile: null
  };
  fileSelectedHandler = e => {
    this.setState({ selectedPic: "" });
    const file = e[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      var i = new Image();

      i.onload = () => {
        const { width, height } = i;
        if (height / width !== 1) {
          alert("Picture must be square.");
        } else {
          this.setState(
            {
              selectedFile: file,
              selectedPic: e.target.result
            },
            this.uploadHandler
          );
        }
      };

      i.src = e.target.result;
    };
  };
  uploadHandler = async () => {
    const snapshot = await storage
      .ref(`users/${auth.currentUser.uid}`)
      .child(auth.currentUser.uid)
      .put(this.state.selectedFile);

    const idToken = await auth.currentUser.getIdToken(true);
    const downloadURL = snapshot.downloadURL;
    axios
      .post(change_photo, {
        idToken,
        downloadURL
      })
      .then(e => {
        this.setState({ selectedPic: e.data.downloadURL });
        this.props.updatePhotoURL(e.data.downloadURL);
      });
  };
  render() {
    return (
      <div className="ChangePicForm-changePicModal">
        <h2 className="ChangePicForm-modalHeading">Change Your Picture</h2>
        <div className="ChangePicForm-close" onClick={this.props.closeModal}>
          ✖
        </div>
        <div className="ChangePicForm-picture">
          {this.state.selectedPic.length ? (
            <img
              src={this.state.selectedPic}
              className="ChangePicForm-chosenImg"
              alt=""
            />
          ) : (
            <CircularLoading
              className="ChangePicForm-loading"
              duration={1}
              stroke="black"
            />
          )}
        </div>
        <Dropzone
          className="ChangePicForm-dropzone"
          onDrop={this.fileSelectedHandler}
        >
          Upload Picture
        </Dropzone>
      </div>
    );
  }
}

export default ChangePicForm;
