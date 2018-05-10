import { connect } from "react-redux";
import Login from "../components/Login";
import { signInWithGithub, signInWithGoogle } from "../actions/auth";

const mapDispatchToProps = dispatch => {
  return {
    signInWithGoogle() {
      dispatch(signInWithGoogle());
    },
    signInWithGithub() {
      dispatch(signInWithGithub());
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
