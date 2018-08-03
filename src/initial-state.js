const initialState = {
  auth: {
    status: "AWAITING_AUTH_RESPONSE",
    displayName: null,
    photoURL: null,
    uid: null,
    username: null
  },
  modal: null,
  games: {},
  invites: {},
  openGames: {}
};

export default initialState;
