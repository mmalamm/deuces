import { db } from "../../admin";
import { _game } from "./interfaces";

const _gamesRef = db.ref("_games");

const get_gameFromGameKey = (gameKey: string): Promise<_game> =>
  new Promise((resolve, reject) => {
    _gamesRef
      .child(gameKey)
      .once("value", snapshot => {
        const game = snapshot.val();
        if (game) {
          resolve(game);
        } else {
          reject(new Error("game not found"));
        }
      })
      .catch(reason => reject(reason));
  });

export default get_gameFromGameKey;
