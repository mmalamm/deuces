import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Homebar from "../components/Homebar/Homebar";
import { signOut } from "../actions/auth";
import { showNewGameForm, showChangePicForm } from "../actions/modal";

const mapStateToProps = ({ auth, modal }) => {
  const { photoURL, username, points } = auth;
  return { photoURL, username, points, modal };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signOut, showNewGameForm, showChangePicForm }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homebar);
