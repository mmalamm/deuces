import initialState from "../initial-state.js";

export default function modalsReducer(state = initialState.modals, action) {
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
    case "SHOW_CHANGE_PIC_FORM":
      return {
        ...state,
        showChangePicForm: true
      };
    case "HIDE_CHANGE_PIC_FORM":
      return {
        ...state,
        showChangePicForm: false
      };
    default:
      return state;
  }
}
