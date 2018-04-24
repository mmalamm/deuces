import { connect } from "react-redux";
import App from "../components/App";
import { signOut, signInWithGoogle, signInWithGithub } from "../actions/auth";

const mapStateToProps = ({ auth, games }) => {
  return { auth, games };
};

const mapDispatchToProps = dispatch => {
  return {
    signInWithGoogle() {
      dispatch(signInWithGoogle());
    },
    signInWithGithub() {
      dispatch(signInWithGithub());
    },
    signOut() {
      dispatch(signOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
