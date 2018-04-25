import React, { Component, Fragment } from "react";
import Homebar from "../../containers/Homebar";
import Gamelist from "../Gamelist";
import Loading from "../Loading";
import Login from "../Login";
import "./App.css";
import NewGameForm from "../../containers/NewGameForm";
import NewUserForm from "../../containers/NewUserForm";

class App extends Component {
  render() {
    const {
      auth,
      games,
      signInWithGoogle,
      signInWithGithub,
      signOut
    } = this.props;
    const renderLogin = () => {
      return (
        <Login
          signInWithGithub={signInWithGithub}
          signInWithGoogle={signInWithGoogle}
        />
      );
    };
    const renderHomescreen = () => {
      const { displayName, photoURL, uid, username, points } = auth;
      const appDash = (
        <Fragment>
          {games.showNewGameForm && <NewGameForm />}
          <div className="App-homebar">
            <Homebar
              displayName={displayName}
              photoURL={photoURL}
              uid={uid}
              signOut={signOut}
            />
          </div>
          <div className="App-dashboard">
            <Gamelist />
          </div>
        </Fragment>
      );
      return username ? appDash : <NewUserForm user={auth} />;
    };

    const renderLoading = () => <Loading />;

    return (
      <div className="App">
        {auth.status === "ANONYMOUS" && renderLogin()}
        {auth.status === "SIGNED_IN" && renderHomescreen()}
        {auth.status === "AWAITING_AUTH_RESPONSE" && renderLoading()}
      </div>
    );
  }
}

export default App;
