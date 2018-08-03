import { db } from "../../admin";

const _gamesRef = db.ref("_games");
const make_gameAndGetKey = (game): Promise<string> =>
  /// refactor this
  new Promise((resolve, reject) => {
    _gamesRef.push(game).then(gameRef => {
      const gameKey = gameRef.path.pieces_[1];
      _gamesRef
        .child(gameKey)
        .child("gameKey")
        .set(gameKey)
        .then(() => {
          console.log(`game ${gameKey} made:`, game);
          resolve(gameKey);
        })
        .catch(reason => reject(reason));
    });
  });

export default make_gameAndGetKey;
