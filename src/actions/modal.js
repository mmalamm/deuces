export const showNewGameForm = () => {
  return dispatch => {
    dispatch({ type: "SHOW_NEW_GAME_FORM" });
  };
};
export const hideModal = () => {
  return dispatch => {
    dispatch({ type: "HIDE_MODAL" });
  };
};
export const showChangePicForm = () => {
  return dispatch => {
    dispatch({ type: "SHOW_CHANGE_PIC_FORM" });
  };
};
