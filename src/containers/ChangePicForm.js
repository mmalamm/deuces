import { connect } from "react-redux";
import ChangePicForm from "../components/ChangePicForm";
import { updatePhotoURL } from "../actions/auth";
import { hideModal } from "../actions/modal";

const mapStateToProps = ({ auth }) => {
  return { selectedPic: auth.photoURL, username: auth.username };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePhotoURL(url) {
      dispatch(updatePhotoURL(url));
    },
    closeModal() {
      dispatch(hideModal());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePicForm);
