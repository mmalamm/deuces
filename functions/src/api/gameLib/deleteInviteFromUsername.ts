import { db, keyify, getUidFromUsername } from "../../admin";

const deleteInviteFromUsername = async (
  username: string,
  gameKey: string
): Promise<{}> => {
  const playerUid = await getUidFromUsername(username);
  const inviteRef = db.ref(
    `users/${keyify(username)}/${playerUid}/invites/${gameKey}`
  );
  return new Promise((resolve, reject) => {
    inviteRef
      .set(null)
      .then(() => {
        resolve();
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export default deleteInviteFromUsername;
