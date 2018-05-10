import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Homebar from "../components/Homebar";
import { signOut } from "../actions/auth";
import { showNewGameForm, showChangePicForm } from "../actions/modal";

const mapStateToProps = ({ auth }) => {
  const { photoURL, username, points } = auth;
  return { photoURL, username, points };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signOut, showNewGameForm, showChangePicForm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Homebar);
