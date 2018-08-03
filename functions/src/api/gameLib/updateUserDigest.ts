import { db, getUidFromUsername, keyify } from "../../admin";
import get_gameFromGameKey from "./get_gameFromGameKey";
import createGameDigestFrom_game from "./createGameDigestFrom_game";

const updateUserDigest = async (
  username: string,
  gameKey: string
): Promise<{}> => {
  const uid = await getUidFromUsername(username);
  const game = await get_gameFromGameKey(gameKey);
  return new Promise((resolve, reject) => {
    db
      .ref(`users/${keyify(username)}/${uid}/games/${gameKey}`)
      .set(createGameDigestFrom_game(game))
      .then(() => resolve())
      .catch(reason => reject(reason));
  });
};

export default updateUserDigest;
