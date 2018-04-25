import { connect } from "react-redux";
import NewUserForm from "../components/NewUserForm";
import { submitNewUserForm, signOut } from "../actions/auth";

const mapDispatchToProps = dispatch => {
  return {
    signOut() {
      dispatch(signOut());
    },
    submitNewUserForm(formData) {
      dispatch(submitNewUserForm(formData));
    }
  };
};

export default connect(null, mapDispatchToProps)(NewUserForm);
