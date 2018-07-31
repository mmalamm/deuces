import { db } from "../../admin";

const openGamesRef = db.ref("openGames");

const deleteOpengameFromGamekey = (gameKey: string): Promise<{}> =>
  new Promise((resolve, reject) => {
    openGamesRef
      .child(gameKey)
      .set(null)
      .then(() => {
        resolve();
      })
      .catch(reason => reject(reason));
  });

export default deleteOpengameFromGamekey;
