import get_gameFromGameKey from "./get_gameFromGameKey";
import sendInvites from "./sendInvites";
import updateUserDigest from "./updateUserDigest";

const updateDigests = (gameKey: string): Promise<{}> =>
  new Promise(async (resolve, reject) => {
    // need to update all digests
    // invites and games
    const thisGame = await get_gameFromGameKey(gameKey);
    const invitesPromise = sendInvites(gameKey, thisGame.invites || []);
    // working on this still
    const gameRefsPromises = Object.keys(thisGame.players)
      .map(uid => thisGame.players[uid])
      .map(p => p.username)
      .map(u => updateUserDigest(u, gameKey));

    return Promise.all([invitesPromise, ...gameRefsPromises])
      .then(() => resolve())
      .catch(reason => reject(reason));
  });

export default updateDigests;
