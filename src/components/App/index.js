import React, { Component, Fragment } from "react";
import Homebar from "../../containers/Homebar";
import Gamelist from "../Gamelist";
import Loading from "../Loading";
import Login from "../Login";
import "./App.css";
import NewGameForm from "../../containers/NewGameForm";
import NewUserForm from "../../containers/NewUserForm";
import WritingNewUser from "../WritingNewUser";

class App extends Component {
  render() {
    const { auth, games, signInWithGoogle, signInWithGithub } = this.props;
    const renderLogin = () => {
      return (
        <Login
          signInWithGithub={signInWithGithub}
          signInWithGoogle={signInWithGoogle}
        />
      );
    };
    const renderHomescreen = () => {
      const { username } = auth;
      const appDash = (
        <Fragment>
          {games.showNewGameForm && <NewGameForm />}
          <div className="App-homebar">
            <Homebar />
          </div>
          <div className="App-dashboard">
            <Gamelist />
          </div>
        </Fragment>
      );
      return username ? appDash : <NewUserForm />;
    };

    return (
      <div className="App">
        {auth.status === "ANONYMOUS" && renderLogin()}
        {auth.status === "SIGNED_IN" && renderHomescreen()}
        {auth.status === "AWAITING_AUTH_RESPONSE" && <Loading />}
        {auth.status === "CREATING_USER" && <WritingNewUser />}
      </div>
    );
  }
}

export default App;
