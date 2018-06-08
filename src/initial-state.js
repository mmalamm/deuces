const initialState = {
  auth: {
    status: "AWAITING_AUTH_RESPONSE",
    displayName: null,
    photoURL: null,
    uid: null,
    username: null
  },
  modal: null,
  games: {
    invites: {},
    myGames: {},
    openGames: {}
  }
};

export default initialState;
