import { keyify, getUidFromUsername, db } from "../../admin";
const deleteGamerefFromUsername = async (
  username: string,
  gameKey: string
): Promise<{}> => {
  const playerUid = await getUidFromUsername(username);
  const gameRef = db.ref(
    `users/${keyify(username)}/${playerUid}/games/${gameKey}`
  );
  return new Promise((resolve, reject) => {
    gameRef
      .set(null)
      .then(() => {
        resolve();
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export default deleteGamerefFromUsername;
