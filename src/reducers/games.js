import initialState from "../initial-state";

import { removeKey } from "../utils/helpers";

export default function gamesReducer(state = initialState.games, action) {
  switch (action.type) {
    case "FETCHING_GAMES":
      return null;
    case "RECIEVE_GAMES":
      return action.games;
    case "RECIEVE_GAME":
      return { ...state, ...action.game };
    case "REMOVE_GAME":
      return removeKey({ ...state }, action.game.gameKey);
    default:
      return state;
  }
}
