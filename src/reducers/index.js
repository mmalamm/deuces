import { combineReducers } from "redux";
import authReducer from "./auth";
import modalReducer from "./modal";
import gamesReducer from "./games";
import invitesReducer from "./invites";
import openGamesReducer from "./openGames";

const reducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  games: gamesReducer,
  invites: invitesReducer,
  openGames: openGamesReducer
});

export default reducer;
