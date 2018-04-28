const initialState = {
  auth: {
    status: "AWAITING_AUTH_RESPONSE",
    displayName: null,
    photoURL: null,
    uid: null,
    username: null
  },
  games: {
    showNewGameForm: false
  }
};

export default initialState;
