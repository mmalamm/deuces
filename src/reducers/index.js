import { combineReducers } from "redux";
import authReducer from "./auth";
import usersReducer from "./users";
import gamesReducer from "./games";

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  games: gamesReducer
});

export default reducer;
