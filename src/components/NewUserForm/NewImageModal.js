import React, { Component } from "react";
import Modal from "../Modal";
import { storage, auth } from "../../fire";
import axios from "axios";
import { CircularLoading } from "respinner";
import Dropzone from "react-dropzone";

import "./NewImageModal.css";

class NewImageModal extends Component {
  state = {
    picScale: 1,
    selectedPic: this.props.selectedPic,
    zoomLevel: 0,
    selectedFile: null
  };
  fileSelectedHandler = e => {
    this.setState({ selectedPic: "" });
    const file = e[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      console.log(e);
      var i = new Image();

      i.onload = () => {
        const { width, height } = i;
        if (height / width !== 1) {
          console.log(height, width);
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
    // this.setState({selectedPic: ''});
    console.log(this.state.selectedFile);
    console.log(this.state.selectedPic);
    const snapshot = await storage
      .ref(`users/${auth.currentUser.uid}`)
      .child(auth.currentUser.uid)
      .put(this.state.selectedFile);
    console.log(snapshot.downloadURL);

    const username = this.props.username;
    const changePhotoURLendpoint =
      "https://us-central1-deuces-bovinecorvus.cloudfunctions.net/api/change_photo_url";
    const idToken = await auth.currentUser.getIdToken(true);
    console.log(snapshot);
    const downloadURL = snapshot.downloadURL;
    axios
      .post(changePhotoURLendpoint, {
        username,
        idToken,
        downloadURL
      })
      .then(e => {
        console.log("dooone~!", e);
        this.setState({ selectedPic: e.data.downloadURL });
        this.props.updatePhotoURL(e.data.downloadURL);
      });
  };
  render() {
    return (
      <Modal>
        <div className="NewImageModal-changePicModal">
          <h2 className="NewImageModal-modalHeading">Change Your Picture</h2>
          <div className="NewImageModal-close" onClick={this.props.closeModal}>
            ✖
          </div>
          <div className="NewImageModal-picture">
            {this.state.selectedPic.length ? (
              <img
                src={this.state.selectedPic}
                className="NewImageModal-chosenImg"
                alt=""
              />
            ) : (
              <CircularLoading
                className="NewImageModal-loading"
                duration={1}
                stroke="black"
              />
            )}
          </div>
          <Dropzone
            className="NewImageModal-dropzone"
            onDrop={this.fileSelectedHandler}
          >
            Upload Picture
          </Dropzone>
        </div>
      </Modal>
    );
  }
}

export default NewImageModal;
