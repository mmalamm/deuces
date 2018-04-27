import { connect } from "react-redux";
import Homebar from "../components/Homebar";
import { signOut } from "../actions/auth";
import { createGame, showNewGameForm } from "../actions/games";

const mapStateToProps = ({ auth }) => {
  const { photoURL, username, points } = auth;
  return { photoURL, username, points };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut() {
      dispatch(signOut());
    },
    showNewGameForm() {
      dispatch(showNewGameForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homebar);
