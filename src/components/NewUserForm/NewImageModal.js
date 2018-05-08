import React, { Component } from "react";
import Modal from "../Modal";
import { storage, auth } from "../../fire";
import axios from "axios";
import { CircularLoading } from "respinner";
class NewImageModal extends Component {
  state = {
    picScale: 1,
    selectedPic: this.props.selectedPic,
    zoomLevel: 0,
    selectedFile: null
  };
  fileSelectedHandler = e => {
    this.setState({ selectedPic: "" });
    const file = e.target.files[0];
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
          alert("picture must be square.");
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

    const promises = [];
    const username = this.props.username;
    const changePhotoURLendpoint =
      "https://us-central1-deuces-bovinecorvus.cloudfunctions.net/api/change_photo_url";
    const idToken = await auth.currentUser.getIdToken(true);
    console.log(snapshot);
    const downloadURL = snapshot.downloadURL;
    // if (username) {
    const p2 = axios.post(changePhotoURLendpoint, {
      username,
      idToken,
      downloadURL
    });
    promises.push(p2);
    // } else {
    //   const p2 = axios.post(changePhotoURLendpoint, { idToken, downloadURL });
    //   promises.unshift(p2);
    // }
    Promise.all(promises).then(e => {
      console.log("dooone~!", e);
      this.setState({ selectedPic: e[0].data.downloadURL });
      this.props.updatePhotoURL(e[0].data.downloadURL);
    });
  };
  render() {
    return (
      <Modal>
        <div className="NewUserForm-changePicModal">
          <h1>Modal</h1>
          <div className="NewUserForm-close" onClick={this.props.closeModal}>
            ✖
          </div>
          {this.state.selectedPic.length ? (
            <img
              src={this.state.selectedPic}
              className="NewUserForm-chosenImg"
              alt=""
            />
          ) : (
            <CircularLoading size={450} duration={1} stroke="#4197ff" />
          )}
          <input type="file" onChange={this.fileSelectedHandler} />
        </div>
      </Modal>
    );
  }
}

export default NewImageModal;
