const initialState = {
  auth: {
    status: "AWAITING_AUTH_RESPONSE",
    displayName: null,
    photoURL: null,
    uid: null,
    username: null
  },
  userRef: {
    status: "NOT_FOUND",
    username: null,
    profilePic: null,
    points: null
  },
  games: {
    showNewGameForm: false
  }
};

export default initialState;
