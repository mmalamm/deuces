import React, { Component, Fragment } from "react";
import Homebar from "../../containers/Homebar";
import Gamelist from "../../containers/Gamelist";
import Loading from "../Loading";
import Login from "../../containers/Login";
import "./App.css";
import NewGameForm from "../../containers/NewGameForm";
import NewUserForm from "../../containers/NewUserForm";
import Logo from "../AssetsSVG/Logo";
import ChangePicForm from "../../containers/ChangePicForm";

const renderModal = modalName => {
  switch (modalName) {
    case "NEW_GAME_FORM":
      return <NewGameForm />;
    case "CHANGE_PIC_FORM":
      return <ChangePicForm />;
    default:
      return null;
  }
};

class App extends Component {
  renderHomescreen = () => {
    const { auth, modal } = this.props;
    const appDash = (
      <Fragment>
        {modal && renderModal(modal)}
        <div className="App-homebar">
          <Homebar />
        </div>
        <div className="App-dashboard">
          <Gamelist />
        </div>
      </Fragment>
    );
    switch (auth.status) {
      case "ANONYMOUS":
        return <Login />;
      case "SIGNED_IN":
        return auth.username ? appDash : <NewUserForm />;
      default:
        return <Loading />;
    }
  };
  render() {
    return (
      <div className="App">
        <Logo width={"89px"} height={"146px"} cls={"App-logo"} />
        {this.renderHomescreen()}
      </div>
    );
  }
}

export default App;
