import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "../components/App";
import { signOut, signInWithGoogle, signInWithGithub } from "../actions/auth";

const mapStateToProps = ({ auth, games }) => {
  return { auth, games };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signOut, signInWithGoogle, signInWithGithub }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
