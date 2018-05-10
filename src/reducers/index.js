import { combineReducers } from "redux";
import authReducer from "./auth";
import modalReducer from "./modal";

const reducer = combineReducers({
  auth: authReducer,
  modal: modalReducer
});

export default reducer;
