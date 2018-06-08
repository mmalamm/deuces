import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Gamelist from "../components/Gamelist";
import {
  startListeningToGameChanges,
  stopListeningToGameChanges
} from "../actions/games";

const mapStateToProps = ({ games, auth }) => ({
  /// need to turn these into arrays
  // for easier digestion by Gamelist
  invites: games.invites,
  openGames: games.openGames,
  myGames: games.myGames,
  username: auth.username.toLowerCase()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { startListeningToGameChanges, stopListeningToGameChanges },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Gamelist);
