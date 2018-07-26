import initialState from "../initial-state";

import { removeKey } from "../utils/helpers";

export default function invitesReducer(state = initialState.invites, action) {
  switch (action.type) {
    case "UPDATE_INVITES":
      return { ...action.invites };
    case "RECIEVE_INVITE":
      return { ...state, ...action.invite };
    case "REMOVE_INVITE":
      return removeKey({ ...state }, action.invite.gameKey);
    default:
      return state;
  }
}
