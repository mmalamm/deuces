import deleteGamerefFromUsername from "./deleteGamerefFromUsername";
import deleteInviteFromUsername from "./deleteInviteFromUsername";

const deleteGamerefsFromUsernames = (
  usernames: string[],
  gameKey: string
): Promise<{}>[] => {
  return usernames.map(u => {
    const p1 = deleteGamerefFromUsername(u, gameKey);
    const p2 = deleteInviteFromUsername(u, gameKey);
    return Promise.all([p1, p2]);
  });
};

export default deleteGamerefsFromUsernames;
