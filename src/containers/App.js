import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "../components/App";
import { signOut } from "../actions/auth";

const mapStateToProps = ({ auth, modals }) => {
  return { auth, modals };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
