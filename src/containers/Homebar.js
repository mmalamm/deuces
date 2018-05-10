import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Homebar from "../components/Homebar";
import { signOut } from "../actions/auth";
import { createGame, showNewGameForm } from "../actions/modals";

const mapStateToProps = ({ auth }) => {
  const { photoURL, username, points } = auth;
  return { photoURL, username, points };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signOut, createGame, showNewGameForm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Homebar);
