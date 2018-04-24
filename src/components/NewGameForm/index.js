import React, { Component } from "react";
import Modal from "../Modal";
import "./NewGameForm.css";

class NewGameForm extends Component {
  render() {
    const { hideNewGameForm } = this.props;
    return (
      <Modal>
        <div className="NewGameForm">
          NewGameForm
          <div className="NewGameForm-close" onClick={hideNewGameForm}>
            ✖
          </div>
        </div>
      </Modal>
    );
  }
}

export default NewGameForm;
