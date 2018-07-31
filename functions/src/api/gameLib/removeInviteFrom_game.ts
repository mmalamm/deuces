import { _invite } from "./interfaces";
import { db } from "../../admin";

const removeInviteFrom_game = (gameKey: string, uid: string): Promise<null> => {
  return new Promise(async (resolve, reject) => {
    const invitesRef = db.ref(`_games/${gameKey}/invites`);
    const oldInvites: _invite[] = await invitesRef.once("value");
    const newInvites: _invite[] = oldInvites.filter(i => i.uid !== uid);
    invitesRef
      .set(newInvites)
      .then(() => resolve())
      .catch(reason => reject(reason));
  });
};

export default removeInviteFrom_game;
