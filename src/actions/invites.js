import { database, auth } from "../fire";
import { child_added, child_removed } from "../utils/constants";

const receiveInvite = inviteData => {
  return { type: "RECIEVE_INVITE", invite: inviteData };
};
const removeInvite = inviteData => ({
  type: "REMOVE_INVITE",
  invite: inviteData
});

let receiveInvitesHandler, removeInvitesHandler, invitesRef;

export const startListeningToInviteChanges = usernameKey => {
  const { uid } = auth.currentUser;
  invitesRef = database.ref(`users/${usernameKey}/${uid}/invites`);
  return dispatch => {
    dispatch({ type: "FETCHING_INVITES" });
    receiveInvitesHandler = invitesRef.on(child_added, snapshot => {
      const inviteData = snapshot.val();
      if (inviteData) {
        dispatch(receiveInvite({ [snapshot.key]: inviteData }));
      }
    });
    removeInvitesHandler = invitesRef.on(child_removed, snapshot => {
      const inviteData = snapshot.val();
      if (inviteData) {
        dispatch(removeInvite(inviteData));
      }
    });
  };
};

export const stopListeningToInviteChanges = () => {
  invitesRef.off(child_added, receiveInvitesHandler);
  invitesRef.off(child_removed, removeInvitesHandler);
  return dispatch => {
    dispatch({ type: "STOP_LISTENING_TO_INVITE_CHANGES" });
  };
};
