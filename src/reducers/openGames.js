import initialState from "../initial-state";

import { removeKey } from "../utils/helpers";

export default function openGamesReducer(
  state = initialState.openGames,
  action
) {
  switch (action.type) {
    case "RECIEVE_OPEN_GAME":
      return { ...state, ...action.openGame };
    case "REMOVE_OPEN_GAME":
      return removeKey({ ...state }, action.openGame.gameKey);
    default:
      return state;
  }
}
