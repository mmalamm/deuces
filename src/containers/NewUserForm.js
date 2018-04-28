import { connect } from "react-redux";
import NewUserForm from "../components/NewUserForm";
import { submitNewUserForm, signOut } from "../actions/auth";

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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
