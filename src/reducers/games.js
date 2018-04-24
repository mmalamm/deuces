import initialState from "../initial-state.js";

export default function gamesReducer(state = initialState.games, action) {
  switch (action.type) {
    case "CREATE_GAME":
      console.log("create game reducer hit");
      return state;
    case "SHOW_NEW_GAME_FORM":
      return {
        ...state,
        showNewGameForm: true
      };
    case "HIDE_NEW_GAME_FORM":
      return {
        ...state,
        showNewGameForm: false
      };
    default:
      return state;
  }
}
