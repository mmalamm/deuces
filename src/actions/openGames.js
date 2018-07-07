import { database } from "../fire";
import { child_added, child_removed } from "../utils/constants";

const receiveOpenGame = gameData => ({
  type: "RECIEVE_OPEN_GAME",
  openGame: gameData
});
const removeOpenGame = gameData => ({
  type: "REMOVE_OPEN_GAME",
  openGame: gameData
});

let receiveOpenGameHandler, removeOpenGameHandler, openGamesRef;

export const startListeningToOpenGameChanges = () => {
  openGamesRef = database.ref("openGames");
  return dispatch => {
    dispatch({ type: "FETCHING_OPEN_GAMES" });
    receiveOpenGameHandler = openGamesRef.on(child_added, snapshot => {
      const openGameData = snapshot.val();
      if (openGameData) {
        dispatch(receiveOpenGame({ [snapshot.key]: openGameData }));
      }
    });
    removeOpenGameHandler = openGamesRef.on(child_removed, snapshot => {
      const openGameData = snapshot.val();
      if (openGameData) {
        dispatch(removeOpenGame(openGameData));
      }
    });
  };
};

export const stopListeningToOpenGameChanges = () => {
  openGamesRef.off(child_added, receiveOpenGameHandler);
  openGamesRef.off(child_removed, removeOpenGameHandler);
  return dispatch => {
    dispatch({ type: "STOP_LISTENING_TO_OPEN_GAME_CHANGES" });
  };
};
