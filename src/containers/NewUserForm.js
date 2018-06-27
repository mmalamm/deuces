import { connect } from "react-redux";
import NewUserForm from "../components/NewUserForm/NewUserForm";
import { submitNewUserForm, signOut } from "../actions/auth";
import { showChangePicForm } from "../actions/modal";

const mapStateToProps = ({ auth, modal }) => {
  return { user: auth, modal };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut() {
      dispatch(signOut());
    },
    submitNewUserForm(formData) {
      dispatch(submitNewUserForm(formData));
    },
    showChangePicForm() {
      dispatch(showChangePicForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
