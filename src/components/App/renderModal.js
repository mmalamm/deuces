import React from 'react';
import NewGameForm from "../../containers/NewGameForm";
import ChangePicForm from "../../containers/ChangePicForm";

const modals = {
  NEW_GAME_FORM: <NewGameForm />,
  CHANGE_PIC_FORM: <ChangePicForm />
}

export default modalName => modals[modalName];