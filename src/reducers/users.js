import initialState from "../initial-state";

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        [action.uid]: {
          displayName: action.displayName,
          photoURL: action.photoURL
        }
      };
    default:
      return state;
  }
}
