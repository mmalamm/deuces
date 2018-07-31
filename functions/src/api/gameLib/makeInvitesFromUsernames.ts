import { _invite } from "./interfaces";

import { getUidFromUsername } from "../../admin";

const makeInvitesFromUsernames = async (
  invitedUsernames: string[]
): Promise<_invite[]> =>
  new Promise<_invite[]>(async (resolve, reject) => {
    console.log("inviting the following users:", invitedUsernames);
    const promises = invitedUsernames.map(u => getUidFromUsername(u));
    const uids = await Promise.all(promises);
    const invites: _invite[] = uids.map((uid, i) => ({
      uid,
      username: invitedUsernames[i],
      status: "PENDING"
    }));
    console.log("invites created:", invites);
    resolve(invites);
  });

export default makeInvitesFromUsernames;
