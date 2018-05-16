import initialState from "../initial-state";

function removeKey(myObj, deleteKey) {
  return Object.assign(
    {},
    ...Object.entries(myObj)
      .filter(([k]) => k !== deleteKey)
      .map(([k, v]) => ({ [k]: v }))
  );
}

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
