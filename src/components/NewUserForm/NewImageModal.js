import React, {Component} from "react";
import Modal from "../Modal";
import ImgEditor from "./ImgEditor";
import {storage, auth, database} from "../../fire";
import axios from 'axios'
import Slider from "react-rangeslider";
const _URL = window.URL || window.webkitURL;
class NewImageModal extends Component {
  state = {
    picScale: 1,
    selectedPic: this.props.selectedPic,
    zoomLevel: 0,
    selectedFile: null
  };
  handleScroll = e => {
    this.setState(oldState => {
      let zoomLevel = Math.round(oldState.zoomLevel - e.deltaY);
      // if (zoomLevel > 100 || zoomLevel < 0) return;
      zoomLevel = zoomLevel > 100
        ? 100
        : zoomLevel < 0
          ? 0
          : zoomLevel;
      const picScale = 1 + zoomLevel / 100 * 3;
      return {zoomLevel, picScale};
    });
  };
  handleSliderChange = e => {
    this.setState({
      zoomLevel: e,
      picScale: 1 + e / 100 * 3
    });
  };
  fileSelectedHandler = e => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.setState({
        selectedFile: file,
        selectedPic: e.target.result
      }, () => console.log("done"));
    };
  };
  uploadHandler = async() => {
    console.log(this.state.selectedFile);
    console.log(this.state.selectedPic);
    const snapshot = await storage
      .ref(`users/${auth.currentUser.uid}`)
      .child(auth.currentUser.uid)
      .put(this.state.selectedFile)
    console.log(snapshot.downloadURL);

    const _userRef = database.ref(`_users/${auth.currentUser.uid}`);

    const promises = [];
    const username = this.props.username;
    const changePhotoURLendpoint = '      https://us-central1-deuces-bovinecorvus.cloudfunctions.net/api/change_phot' +
        'o_url';
    const idToken = await auth
      .currentUser
      .getIdToken(true);
    console.log(snapshot);
    const downloadURL = snapshot.downloadURL;
    if (username) {
      const p2 = axios.post(changePhotoURLendpoint, {username, idToken, downloadURL})
      promises.push(p2);
    } else {
      const p2 = axios.post(changePhotoURLendpoint, {idToken, downloadURL})
      promises.push(p2);
    }
    Promise
      .all(promises)
      .then(() => console.log('dooone~!'))
  };
  render() {
    return (
      <Modal>
        <div className="NewUserForm-changePicModal">
          <h1>Modal</h1>
          <div className="NewUserForm-close" onClick={this.props.closeModal}>
            ✖
          </div>
          <img src={this.state.selectedPic} alt=""/>
          <input type="file" onChange={this.fileSelectedHandler}/>
          <button onClick={this.uploadHandler}>Upload!</button>
          {/* <ImgEditor
            scale={this.state.picScale}
            image={this.state.selectedPic}
            alt=""
          />
          <div className="slider">
            <Slider
              min={0}
              max={100}
              value={this.state.zoomLevel}
              onChange={this.handleSliderChange}
              orientation="horizontal"
              tooltip={false}
            />
          </div> */}
        </div>
      </Modal>
    );
  }
}

export default NewImageModal;
