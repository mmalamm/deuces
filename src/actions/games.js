import { database, auth } from "../fire";
import { createGameEndpoint } from "../utils/api";
import { child_added, child_removed } from "../utils/constants";
import axios from "axios";

let receiveGameHandler, removeGameHandler, userGamesRef;

const receiveGame = gameData => {
  return { type: "RECIEVE_GAME", game: gameData };
};
const removeGame = gameData => ({ type: "REMOVE_GAME", game: gameData });

export const submitNewGameForm = data => {
  const { gameName, inviteOnly } = data;
  return async dispatch => {
    const idToken = await auth.currentUser.getIdToken(true);
    axios
      .post(createGameEndpoint, {
        idToken,
        gameName,
        inviteOnly
      })
      .then(({ data }) => {
        console.log(data);
      });
  };
};

export const startListeningToGameChanges = usernameKey => {
  const { uid } = auth.currentUser;
  userGamesRef = database.ref(`users/${usernameKey}/${uid}/games`);
  return dispatch => {
    dispatch({ type: "FETCHING_GAMES" });
    receiveGameHandler = userGamesRef.on("child_added", snapshot => {
      const gameData = snapshot.val();
      if (gameData) {
        dispatch(receiveGame({ [snapshot.key]: gameData }));
      }
    });
    removeGameHandler = userGamesRef.on("child_removed", snapshot => {
      const gameData = snapshot.val();
      if (gameData) {
        dispatch(removeGame(gameData));
      }
    });
  };
};

export const stopListeningToGameChanges = () => {
  userGamesRef.off(child_added, receiveGameHandler);
  userGamesRef.off(child_removed, removeGameHandler);
  return dispatch => {
    dispatch({ type: "STOP_LISTENING_TO_GAME_CHANGES" });
  };
};
