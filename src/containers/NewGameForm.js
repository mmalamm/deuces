import { connect } from "react-redux";
import NewGameForm from "../components/NewGameForm";
import { hideModal, showChangePicForm } from "../actions/modal";

const mapDispatchToProps = dispatch => {
  return {
    hideModal() {
      dispatch(hideModal());
    },
    showChangePicForm() {
      dispatch(showChangePicForm());
    }
  };
};

export default connect(null, mapDispatchToProps)(NewGameForm);
