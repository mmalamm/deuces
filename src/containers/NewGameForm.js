import { connect } from "react-redux";
import NewGameForm from "../components/NewGameForm";
import { hideNewGameForm } from "../actions/modals";

const mapDispatchToProps = dispatch => {
  return {
    hideNewGameForm() {
      dispatch(hideNewGameForm());
    }
  };
};

export default connect(null, mapDispatchToProps)(NewGameForm);
