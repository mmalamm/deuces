import { db } from "../../admin";

const _gamesRef = db.ref("_games");

const delete_gameFromGamekey = (gameKey: string): Promise<{}> =>
  new Promise((resolve, reject) => {
    _gamesRef
      .child(gameKey)
      .set(null)
      .then(() => {
        resolve();
      })
      .catch(reason => reject(reason));
  });

export default delete_gameFromGamekey;
