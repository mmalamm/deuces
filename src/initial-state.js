const initialState = {
  auth: {
    status: "AWAITING_AUTH_RESPONSE",
    displayName: null,
    photoURL: null,
    uid: null,
    username: null
  },

  modals: {
    showNewGameForm: false,
    showChangePicForm: false
  }
};

export default initialState;
