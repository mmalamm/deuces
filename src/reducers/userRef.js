import initialState from "../initial-state";

export default function userRefReducer(state = initialState.userRef, action) {
  switch (action.type) {
    case "FETCH_USER_DATA":
      return {
        status: "AWAITING_USER_DATA"
      };
    default:
      return state;
  }
}
