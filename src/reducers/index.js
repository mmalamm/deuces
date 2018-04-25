import { combineReducers } from "redux";
import authReducer from "./auth";
import gamesReducer from "./games";
import userRefReducer from "./userRef";

const reducer = combineReducers({
  auth: authReducer,
  games: gamesReducer,
  userRef: userRefReducer
});

export default reducer;
