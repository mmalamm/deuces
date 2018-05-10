import { combineReducers } from "redux";
import authReducer from "./auth";
import modalsReducer from "./modals";

const reducer = combineReducers({
  auth: authReducer,
  modals: modalsReducer
});

export default reducer;
