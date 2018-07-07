import React from "react";
import NewGameForm from "../../containers/NewGameForm";
import ChangePicForm from "../../containers/ChangePicForm";
import { modalize } from "../Modal/Modal";

const modals = {
  NEW_GAME_FORM: modalize(<NewGameForm />),
  CHANGE_PIC_FORM: modalize(<ChangePicForm />)
};

export default modalName => modals[modalName];
