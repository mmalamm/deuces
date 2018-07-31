import { db } from "../../admin";

const _gamesRef = db.ref("_games");

const getNextPositionFromGamekey = (gameKey: string): Promise<number> =>
  new Promise((resolve, reject) => {
    _gamesRef
      .child(gameKey)
      .child("players")
      .once("value")
      .then(snapshot => {
        const players = snapshot.val();
        const position = players
          ? Math.max(...Object.keys(players).map(k => players[k].position)) + 1
          : 0;
        resolve(position);
      })
      .catch(reason => reject(reason));
  });

export default getNextPositionFromGamekey;
