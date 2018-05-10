import React, { Component } from "react";
import Modal from "../Modal";
import "./NewGameForm.css";

class NewGameForm extends Component {
  render() {
    const { hideModal } = this.props;
    return (
      <Modal>
        <div className="NewGameForm">
          NewGameForm
          <div className="NewGameForm-close" onClick={hideModal}>
            ✖
          </div>
        </div>
      </Modal>
    );
  }
}

export default NewGameForm;
