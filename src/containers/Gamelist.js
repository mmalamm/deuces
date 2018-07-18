import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Gamelist from "../components/Gamelist/Gamelist";
import {
  startListeningToGameChanges,
  stopListeningToGameChanges,
  deleteGame
} from "../actions/games";
import {
  startListeningToOpenGameChanges,
  stopListeningToOpenGameChanges
} from "../actions/openGames";
import {
  startListeningToInviteChanges,
  stopListeningToInviteChanges
} from "../actions/invites";
import values from "lodash/values";

const mapStateToProps = ({ games, openGames, invites, auth }) => ({
  /// need to turn these into arrays
  // for easier digestion by Gamelist
  games: values(games),
  openGames: values(openGames),
  invites: values(invites),
  username: auth.username,
  usernameKey: auth.username.toLowerCase()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startListeningToGameChanges,
      stopListeningToGameChanges,
      startListeningToOpenGameChanges,
      stopListeningToOpenGameChanges,
      startListeningToInviteChanges,
      stopListeningToInviteChanges,
      deleteGame
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gamelist);
