export const createGame = () => {
  return dispatch => {
    dispatch({ type: "CREATING_GAME" });
    dispatch({ type: "CREATE_GAME" });
    console.log("createGame Action!!");
  };
};

export const showNewGameForm = () => {
  return dispatch => {
    dispatch({ type: "SHOW_NEW_GAME_FORM" });
  };
};
export const hideNewGameForm = () => {
  return dispatch => {
    dispatch({ type: "HIDE_NEW_GAME_FORM" });
  };
};
