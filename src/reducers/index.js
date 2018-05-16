import { combineReducers } from "redux";
import authReducer from "./auth";
import modalReducer from "./modal";
import gamesReducer from "./games";

const reducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  games: gamesReducer
});

export default reducer;
