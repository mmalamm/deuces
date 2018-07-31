import { _invite } from "./interfaces";
import get_gameFromGameKey from "./get_gameFromGameKey";
import createGameDigestFrom_game from "./createGameDigestFrom_game";
import { db, keyify } from "../../admin";

const sendInvites = async (
  gameKey: string,
  invites: _invite[]
): Promise<void[]> => {
  // add an invite for this game to each player's invites node
  const game = await get_gameFromGameKey(gameKey);
  const digest = createGameDigestFrom_game(game);
  console.log("sending invites...");
  return Promise.all(
    invites.map(({ username, uid }) => {
      console.log(`sending invite for game ${gameKey} to ${username}...`);
      return db
        .ref(`users/${keyify(username)}/${uid}/invites/${gameKey}`)
        .set(digest);
    })
  );
};

export default sendInvites;
