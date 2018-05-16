import { connect } from "react-redux";
import NewGameForm from "../components/NewGameForm";
import { hideModal } from "../actions/modal";
import { submitNewGameForm } from "../actions/games";

const mapStateToProps = ({ auth, modal }) => {
  return { user: auth, modal };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal() {
      dispatch(hideModal());
    },
    submitNewGameForm(data) {
      dispatch(submitNewGameForm(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGameForm);
