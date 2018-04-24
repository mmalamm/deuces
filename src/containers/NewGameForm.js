import { connect } from "react-redux";
import NewGameForm from "../components/NewGameForm";
import { hideNewGameForm } from "../actions/games";

const mapDispatchToProps = dispatch => {
  return {
    hideNewGameForm() {
      dispatch(hideNewGameForm());
    }
  };
};

export default connect(null, mapDispatchToProps)(NewGameForm);
