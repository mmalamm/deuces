import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Gamelist from "../components/Gamelist";
import {
  startListeningToGameChanges,
  stopListeningToGameChanges
} from "../actions/games";

const mapStateToProps = ({ games, auth }) => ({
  games: games ? Object.keys(games).map(key => games[key]) : [],
  username: auth.username.toLowerCase()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { startListeningToGameChanges, stopListeningToGameChanges },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Gamelist);
