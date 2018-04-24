const initialState = {
  auth: {
    status: "AWAITING_AUTH_RESPONSE",
    displayName: null,
    photoURL: null,
    uid: null
  },
  users: {},
  games: {
    showNewGameForm: false
  }
};

export default initialState;
