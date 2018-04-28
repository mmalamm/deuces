import { combineReducers } from "redux";
import authReducer from "./auth";
import gamesReducer from "./games";

const reducer = combineReducers({
  auth: authReducer,
  games: gamesReducer
});

export default reducer;
