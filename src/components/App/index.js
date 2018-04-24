import React, { Component, Fragment } from "react";
import Homebar from "../../containers/Homebar";
import Gamelist from "../Gamelist";
import Loading from "../Loading";
import Login from "../Login";
import "./App.css";
import NewGameForm from "../../containers/NewGameForm";

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
      console.log(auth);
      return (
        <Login
          signInWithGithub={signInWithGithub}
          signInWithGoogle={signInWithGoogle}
        />
      );
    };
    const renderHomescreen = () => {
      const { displayName, photoURL, uid } = auth;
      return (
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
