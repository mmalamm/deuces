import React, { Component, Fragment } from "react";
import Homebar from "../../containers/Homebar";
import Gamelist from "../Gamelist";
import Loading from "../Loading";
import Login from "../../containers/Login";
import "./App.css";
import NewGameForm from "../../containers/NewGameForm";
import NewUserForm from "../../containers/NewUserForm";
import Logo from "../AssetsSVG/Logo";

class App extends Component {
  renderHomescreen = () => {
    const { auth, modals } = this.props;
    const appDash = (
      <Fragment>
        {modals.showNewGameForm && <NewGameForm />}
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
