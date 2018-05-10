import { connect } from "react-redux";
import NewUserForm from "../components/NewUserForm";
import { submitNewUserForm, signOut, updatePhotoURL } from "../actions/auth";

const mapStateToProps = ({ auth }) => {
  return { user: auth };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut() {
      dispatch(signOut());
    },
    submitNewUserForm(formData) {
      dispatch(submitNewUserForm(formData));
    },
    updatePhotoURL(url) {
      dispatch(updatePhotoURL(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
