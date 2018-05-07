import React, { Component } from "react";
import Modal from "../Modal";
import ImgEditor from "./ImgEditor";
import Slider from "react-rangeslider";
class NewImageModal extends Component {
  state = {
    picScale: 1,
    selectedPic: this.props.selectedPic,
    zoomLevel: 0
  };
  componentDidMount() {
    window.addEventListener("wheel", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleScroll);
  }
  handleScroll = e => {
    this.setState(oldState => {
      let zoomLevel = Math.round(oldState.zoomLevel - e.deltaY);
      // if (zoomLevel > 100 || zoomLevel < 0) return;
      zoomLevel = zoomLevel > 100 ? 100 : zoomLevel < 0 ? 0 : zoomLevel;
      const picScale = 1 + zoomLevel / 100 * 3;
      return { zoomLevel, picScale };
    });
  };
  handleSliderChange = e => {
    this.setState({ zoomLevel: e, picScale: 1 + e / 100 * 3 });
  };
  fileSelectedHandler = e => {
    const file = e.target.files[0];
    console.log(file);
    this.setState({ selectedPic: file.blob() });
    // const uploadTask = userImgRef
    //   .child(file.name)
    //   .put(file, { contentType: file.type });
  };
  render() {
    return (
      <Modal>
        <div className="NewUserForm-changePicModal">
          <h1>Modal</h1>
          <div className="NewUserForm-close" onClick={this.props.closeModal}>
            ✖
          </div>
          <input type="file" name="" id="" />
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
